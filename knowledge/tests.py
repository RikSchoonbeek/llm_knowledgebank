from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from knowledge.models import Document, Tag
from user.models import User


class DocumentViewSetTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='testuser', password='12345')
        cls.tag_1 = Tag.objects.create(
            name='Test Tag 1',
            description='This is a test tag',
            owner=cls.user,
            created_by=cls.user,
        )

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.test_file_content = b"file_content"
        self.existing_document_data = {
            'name': 'Test Document',
            'description': 'This is a test document',
            'content': SimpleUploadedFile(
                "test_file.txt", self.test_file_content,
            ),
            'owner': self.user,
            'created_by': self.user,
        }
        self.document = Document.objects.create(
            **self.existing_document_data
        )
        self.other_test_file_content = b"other_file_content"
        self.new_document_data = {
            'name': 'New Test Document',
            'description': 'This is a new test document',
            'content': SimpleUploadedFile(
                "other_test_file.txt", self.other_test_file_content,
            ),
            'owner': self.user.id,
            'created_by': self.user.id,
        }

    def test_create_document(self):
        response = self.client.post(
            reverse('document-list'), 
            self.new_document_data,
        )
        self.assertEqual(
            response.status_code, 
            status.HTTP_201_CREATED,
        )

        try:
            created_document = Document.objects.get(id=response.data['id'])
        except Document.DoesNotExist:
            raise AssertionError('Document was not created')
        
        self.assertCountEqual(
            {
                'content': f'http://testserver/{created_document.content.name}',
                'created_by': 8,
                'description': 'This is a new test document',
                'id': 9,
                'name': 'New Test Document',
                'owner': 8,
                'tags': [],
            }, 
            response.data,
        )

        self.assertEqual(
            self.new_document_data['name'],
            created_document.name, 
        )
        self.assertEqual(
            self.new_document_data['description'],
            created_document.description,
        )
        self.assertEqual(
            self.other_test_file_content,
            created_document.content.read(),
        )
        self.assertEqual(
            self.new_document_data['owner'],
            created_document.owner.id,
        )
        self.assertEqual(
            self.new_document_data['created_by'],
            created_document.created_by.id,
        )

    # def test_update_document(self):
    #     response = self.client.put(reverse('document-detail', kwargs={'pk': self.document.id}), self.new_document_data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(Document.objects.get(id=self.document.id).name, self.new_document_data['name'])

    # def test_get_document(self):
    #     response = self.client.get(reverse('document-detail', kwargs={'pk': self.document.id}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_delete_document(self):
    #     response = self.client.delete(reverse('document-detail', kwargs={'pk': self.document.id}))
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     self.assertEqual(Document.objects.count(), 0)

    # def test_list_documents(self):
    #     response = self.client.get(reverse('document-list'))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)
    #     self.assertCountEqual([
    #         {

    #         }
    #     ])


# class TagViewSetTestCase(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username='testuser', password='12345')
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)
#         self.tag = Tag.objects.create(
#             name='Test Tag',
#             description='This is a test tag',
#             owner=self.user,
#         )
#         self.tag_data = {
#             'name': 'New Test Tag',
#             'description': 'This is a new test tag',
#             'owner': self.user.id,
#         }

#     def test_create_tag(self):
#         response = self.client.post(reverse('tag-list'), self.tag_data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Tag.objects.get(name=self.tag_data['name']).description, self.tag_data['description'])

#     def test_update_tag(self):
#         response = self.client.put(reverse('tag-detail', kwargs={'pk': self.tag.id}), self.tag_data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(Tag.objects.get(id=self.tag.id).name, self.tag_data['name'])

#     def test_get_tag(self):
#         response = self.client.get(reverse('tag-detail', kwargs={'pk': self.tag.id}))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
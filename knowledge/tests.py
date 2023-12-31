import shutil
import tempfile

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from knowledge.models import Document, Tag
from user.models import User


# A temporary directory is used for file storage during tests, to be deleted
# when the tests are finished.
@override_settings(MEDIA_ROOT=(tempfile.mkdtemp()))
class DocumentViewSetTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="testuser", password="12345")
        cls.user_2 = User.objects.create_user(username="testuser_2", password="12345")
        cls.tag_1 = Tag.objects.create(
            name="Test Tag 1",
            description="This is a test tag",
            owner=cls.user,
            created_by=cls.user,
        )
        cls.tag_2 = Tag.objects.create(
            name="Test Tag 2",
            description="Some description",
            owner=cls.user,
            created_by=cls.user,
        )

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.test_file_content = b"file_content"
        self.existing_document_data = {
            "name": "Test Document",
            "description": "This is a test document",
            "content": SimpleUploadedFile(
                "test_file.txt",
                self.test_file_content,
            ),
            "owner": self.user,
            "created_by": self.user,
        }
        self.document = Document.objects.create(**self.existing_document_data)
        self.document.tags.set([self.tag_1])
        self.other_test_file_content = b"other_file_content"
        self.new_document_data = {
            "name": "New Test Document",
            "description": "This is a new test document",
            "content": SimpleUploadedFile(
                "other_test_file.txt",
                self.other_test_file_content,
            ),
            "owner": self.user_2.id,
            "tags": [self.tag_2.id],
        }

    def tearDown(self):
        # See comment above TestCase
        shutil.rmtree(settings.MEDIA_ROOT)
        super().tearDown()

    def test_create_document(self):
        response = self.client.post(
            reverse("document-list"),
            self.new_document_data,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        try:
            created_document = Document.objects.get(id=response.data["id"])
        except Document.DoesNotExist:
            raise AssertionError("Document was not created")

        self.assertDictEqual(
            {
                "content": f"http://testserver{settings.MEDIA_URL}{created_document.content.name}",
                "description": "This is a new test document",
                "id": created_document.id,
                "name": "New Test Document",
                "owner": self.user_2.id,
                "tags": [self.tag_2.id],
            },
            response.data,
        )

        self.assertEqual(
            self.new_document_data["name"],
            created_document.name,
        )
        self.assertEqual(
            self.new_document_data["description"],
            created_document.description,
        )
        self.assertEqual(
            self.other_test_file_content,
            created_document.content.read(),
        )
        self.assertEqual(
            self.new_document_data["owner"],
            created_document.owner.id,
        )
        self.assertEqual(
            self.user,
            created_document.created_by,
        )

    def test_delete_document(self):
        """Assert Document instance, and content file, are deleted"""
        response = self.client.delete(
            reverse("document-detail", kwargs={"pk": self.document.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Document.objects.count(), 0)

        # Assert content file is deleted
        with self.assertRaises(FileNotFoundError):
            self.document.content.open()

    def test_get_document(self):
        response = self.client.get(
            reverse("document-detail", kwargs={"pk": self.document.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(
            {
                "content": f"http://testserver{settings.MEDIA_URL}{self.document.content.name}",
                "description": self.document.description,
                "id": self.document.id,
                "name": self.document.name,
                "owner": self.document.owner.id,
                "tags": list(self.document.tags.all().values_list("id", flat=True)),
            },
            response.data,
        )

    def test_list_documents(self):
        """Assert only documents owned by the authenticated user are returned"""
        Document.objects.create(
            name="Other Document",
            description="This is another test document",
            content=SimpleUploadedFile(
                "other_test_file.txt",
                self.other_test_file_content,
            ),
            owner=self.user_2,
            created_by=self.user_2,
        )
        response = self.client.get(reverse("document-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertCountEqual(
            [
                {
                    "content": f"http://testserver{settings.MEDIA_URL}{self.document.content.name}",
                    "description": self.document.description,
                    "id": self.document.id,
                    "name": self.document.name,
                    "owner": self.document.owner.id,
                    "tags": list(self.document.tags.all().values_list("id", flat=True)),
                }
            ],
            response.data,
        )

    def test_update_document(self):
        response = self.client.put(
            reverse("document-detail", kwargs={"pk": self.document.id}),
            self.new_document_data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.document.refresh_from_db()
        updated_document = self.document

        self.assertDictEqual(
            {
                "content": f"http://testserver{settings.MEDIA_URL}{updated_document.content.name}",
                "description": self.new_document_data["description"],
                "id": self.document.id,
                "name": self.new_document_data["name"],
                "owner": self.new_document_data["owner"],
                "tags": self.new_document_data["tags"],
            },
            response.data,
        )

        self.assertEqual(
            self.new_document_data["name"],
            updated_document.name,
        )
        self.assertEqual(
            self.new_document_data["description"],
            updated_document.description,
        )
        self.assertEqual(
            self.other_test_file_content,
            updated_document.content.read(),
        )
        self.assertEqual(
            self.new_document_data["owner"],
            updated_document.owner.id,
        )
        self.assertEqual(
            self.user,
            updated_document.created_by,
        )
        self.assertEqual(
            self.new_document_data["tags"],
            list(updated_document.tags.all().values_list("id", flat=True)),
        )


class TagViewSetTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="testuser", password="12345")
        cls.user_2 = User.objects.create_user(username="testuser_2", password="12345")

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.tag = Tag.objects.create(
            name="Test Tag",
            description="This is a test tag",
            owner=self.user,
            created_by=self.user,
        )
        self.tag_data = {
            "name": "New Test Tag",
            "description": "This is a new test tag",
            "owner": self.user.id,
        }

    def test_create_tag(self):
        response = self.client.post(reverse("tag-list"), self.tag_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        created_tag = Tag.objects.last()

        # Assert response data contains data of created tag
        self.assertDictEqual(
            {
                "id": created_tag.id,
                **self.tag_data,
            },
            response.data,
        )
        # Assert tag is created with expected data
        self.assertEqual(
            self.tag_data["description"],
            created_tag.description,
        )
        self.assertEqual(
            self.tag_data["name"],
            created_tag.name,
        )
        self.assertEqual(self.tag_data["owner"], created_tag.owner.id)

    def test_update_tag(self):
        response = self.client.put(
            reverse("tag-detail", kwargs={"pk": self.tag.id}), self.tag_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Tag.objects.get(id=self.tag.id).name, self.tag_data["name"])

    def test_get_tag(self):
        response = self.client.get(reverse("tag-detail", kwargs={"pk": self.tag.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_tags(self):
        """Assert only tags owned by the authenticated user are returned"""
        Tag.objects.create(
            name="Other Tag",
            description="This is another test tag",
            owner=self.user_2,
            created_by=self.user_2,
        )
        response = self.client.get(reverse("tag-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertCountEqual(
            [
                {
                    "id": self.tag.id,
                    "name": self.tag.name,
                    "description": self.tag.description,
                    "owner": self.tag.owner.id,
                },
            ],
            response.data,
        )

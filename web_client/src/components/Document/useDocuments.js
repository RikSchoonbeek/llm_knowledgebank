import { useCallback, useContext, useEffect } from 'react'

import axios from 'axios'

import { apiUrls } from '../../SystemConfig'
import { DocumentsContext } from './DocumentsContext'
import { emptyDocumentFormData } from '../common/form/emptyFormData'
import { ModalContext } from '../common/ModalContext'
import { UserContext } from '../user/UserContext'

const useDocuments = () => {
  const {
    documentFormData,
    documents,
    setDocumentFormData,
    setDocuments,
    setTags,
    tags,
  } = useContext(DocumentsContext)
  const { setModal } = useContext(ModalContext)
  const { user } = useContext(UserContext)

  // TODO implement optional filter
  const fetchDocuments = () => {
    axios
      .get(apiUrls.document())
      .then((response) => {
        setDocuments(response.data)
      })
      .catch((error) => {
        // TODO: handle error
        console.error(error)
      })
  }
  const fetchTags = () => {
    axios
      .get(apiUrls.tag())
      .then((response) => {
        setTags(response.data)
      })
      .catch((error) => {
        // TODO: handle error
        console.error(error)
      })
  }

  useEffect(() => {
    fetchDocuments()
    fetchTags()
  }, [])

  const resetDocumentFormData = useCallback(
    (document) => {
      if (document) {
        const data = { ...document }
        delete data.content
        // TODO temporary fix since the form tags state expects an array with objects
        //   that have both id and label properties.
        data.tags = tags
          .filter((tag) => data.tags.includes(tag.id))
          .map((tag) => ({ id: tag.id, label: tag.name }))
        setDocumentFormData(data)
      } else {
        setDocumentFormData(emptyDocumentFormData)
      }
    },
    [document, setDocumentFormData]
  )

  const createDocument = () => {
    const data = { ...documentFormData, owner: user.id }
    data.tags = documentFormData.tags.map((tag) => tag.id)
    axios
      .post(apiUrls.document(), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchDocuments()
        resetDocumentFormData()
        setModal(null)
        alert('Document created successfully')
      })
      .catch((error) => {
        // TODO: handle error
        console.error(error)
        alert('An error occurred while creating the document')
      })
  }

  const deleteDocument = (documentId) => {
    axios
      .delete(apiUrls.document(documentId))
      .then(() => {
        fetchDocuments()
        alert('Document deleted successfully')
      })
      .catch((error) => {
        // TODO: handle error
        console.error(error)
        alert('An error occurred while deleting the document')
      })
  }

  const updateDocument = (documentID) => {
    const data = { ...documentFormData, owner: user.id }
    data.tags = documentFormData.tags.map((tag) => tag.id)
    axios
      .patch(apiUrls.document(documentID), data)
      .then(() => {
        fetchDocuments()
        resetDocumentFormData()
        setModal(null)
        alert('Document updated successfully')
      })
      .catch((error) => {
        // TODO: handle error
        console.error(error)
        alert('An error occurred while updating the document')
      })
  }

  return {
    createDocument,
    deleteDocument,
    documentFormData,
    documents,
    resetDocumentFormData,
    setDocumentFormData,
    setDocuments,
    setTags,
    tags,
    updateDocument,
  }
}

export default useDocuments

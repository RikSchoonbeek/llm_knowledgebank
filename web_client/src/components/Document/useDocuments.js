import { useContext, useEffect } from 'react'

import axios from 'axios'

import { apiUrls } from '../../SystemConfig'
import { DocumentsContext } from './DocumentsContext'
import { documentFormInitData } from '../common/form/emptyFormData'
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

  const resetDocumentFormData = () => setDocumentFormData(documentFormInitData)

  const createDocument = (e) => {
    e.preventDefault()
    // const data = new FormData()
    // data.append('content', documentFormData.content)
    // data.append('title', documentFormData.title)
    // data.append('description', documentFormData.description)
    // data.append('tags', JSON.stringify(documentFormData.tags))
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

  return {
    createDocument,
    documentFormData,
    documents,
    resetDocumentFormData,
    setDocumentFormData,
    setDocuments,
    setTags,
    tags,
  }
}

export default useDocuments

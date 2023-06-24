import { useContext, useEffect } from 'react'

import axios from 'axios'

import { apiUrls } from '../../SystemConfig'
import { DocumentsContext } from './DocumentsContext'

const useDocuments = () => {
  const { documents, setDocuments } = useContext(DocumentsContext)

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

  useEffect(() => {
    fetchDocuments()
  }, [])

  // const addDocument = (document) => {
  //   axios
  //     .post(apiUrls.document(), document)
  //     .then((response) => {
  //       // Initiate fetch updated documents
  //     })
  //     .catch((error) => {
  //       // TODO: handle error
  //       console.error(error)
  //     })
  // }

  return {
    documents,
    setDocuments,
  }
}

export default useDocuments

import { useContext } from 'react'
import { DocumentsContext } from './DocumentsContext'

const useDocuments = () => {
  const { documents, setDocuments } = useContext(DocumentsContext)

  return {
    documents,
    setDocuments,
  }
}

export default useDocuments

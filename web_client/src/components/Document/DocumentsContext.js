import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

import { documentFormInitData } from '../common/form/emptyFormData'

export const DocumentsContext = createContext()

export function DocumentsProvider({ children }) {
  const [documents, setDocuments] = useState([])
  const [tags, setTags] = useState([])
  const [documentFormData, setDocumentFormData] = useState(documentFormInitData)

  return (
    <DocumentsContext.Provider
      value={{
        documentFormData,
        documents,
        setDocumentFormData,
        setDocuments,
        setTags,
        tags,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  )
}

DocumentsProvider.propTypes = {
  children: PropTypes.any,
}

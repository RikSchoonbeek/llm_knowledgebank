import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const DocumentsContext = createContext()

export function DocumentsProvider({ children }) {
  const [documents, setDocuments] = useState([])

  return (
    <DocumentsContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentsContext.Provider>
  )
}

DocumentsProvider.propTypes = {
  children: PropTypes.any,
}

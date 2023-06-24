import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { apiUrls } from '../../SystemConfig'

export const DocumentsContext = createContext()

export function DocumentsProvider({ children }) {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    axios
      .get(apiUrls.document())
      .then((response) => {
        setDocuments(response.data)
      })
      .catch((error) => {
        // TODO: handle error
        console.error(error)
      })
  }, [])

  return (
    <DocumentsContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentsContext.Provider>
  )
}

DocumentsProvider.propTypes = {
  children: PropTypes.any,
}

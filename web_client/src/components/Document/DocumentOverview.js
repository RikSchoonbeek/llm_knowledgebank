import React from 'react'
import Document from './Document'
import useDocuments from './useDocuments'

function DocumentOverview() {
  const { documents } = useDocuments()

  return (
    <div>
      {documents.map((document) => (
        <Document key={document.id} document={document} />
      ))}
    </div>
  )
}

export default DocumentOverview

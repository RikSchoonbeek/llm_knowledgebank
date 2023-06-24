import React, { useContext } from 'react'

import Document from './Document'
import Modal from '../common/Modal'
import { ModalContext } from '../common/ModalContext'
import useDocuments from './useDocuments'
import DocumentForm from './DocumentForm'

function DocumentOverview() {
  const { documents } = useDocuments()
  const { setModal } = useContext(ModalContext)

  const openAddDocumentModal = () => {
    setModal(<Modal title="Add new document" content={<DocumentForm />} />)
  }

  return (
    <div>
      <button onClick={openAddDocumentModal} title="Add new document">
        +
      </button>
      {documents.map((document) => (
        <Document key={document.id} document={document} />
      ))}
    </div>
  )
}

export default DocumentOverview

import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import '../../css/document-context-menu.css'
import Modal from '../common/Modal'
import DocumentForm from './DocumentForm'
import { ModalContext } from '../common/ModalContext'
import useDocuments from './useDocuments'

const DocumentContextMenu = ({ document, menuPosition, onCloseMenu }) => {
  const { setModal } = useContext(ModalContext)
  const { deleteDocument } = useDocuments()

  const handleEdit = () => {
    console.log('handleEdit')
    onCloseMenu()
    openEditDocumentModal()
  }

  const openEditDocumentModal = () => {
    setModal(
      <Modal
        title="Edit document"
        content={<DocumentForm document={document} />}
      />
    )
  }

  return (
    <div
      onClick={onCloseMenu}
      // onContextMenu={() => console.log('onContextMenu')}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onCloseMenu()
      }}
      className="document-context-menu-backdrop"
    >
      <div
        className="document-context-menu-container"
        style={{
          position: 'absolute',
          top: menuPosition.y,
          left: menuPosition.x,

          backgroundColor: 'white',
          border: '1px solid black',
        }}
      >
        <button className="menu-item" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="menu-item"
          onClick={() => deleteDocument(document.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

DocumentContextMenu.propTypes = {
  document: PropTypes.object.isRequired,
  menuPosition: PropTypes.object.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
}

export default DocumentContextMenu

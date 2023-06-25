import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DocumentContextMenu from './DocumentContextMenu'

import '../../css/document.css'

const Document = ({ document }) => {
  const [menuOpen, setOpenMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState(null)

  const handleCloseMenu = () => {
    setOpenMenu(false)
    setMenuPosition(null)
  }

  const openContextMenu = (e) => {
    e.preventDefault()
    setOpenMenu(true)
    setMenuPosition({ x: e.clientX, y: e.clientY })
  }

  const getContainerClassName = () => {
    let className = 'document-container'
    if (menuOpen) {
      className += ' context-menu-open'
    }
    return className
  }

  return (
    <div className={getContainerClassName()} onContextMenu={openContextMenu}>
      <div className="document-name">{document.name}</div>
      {menuOpen && (
        <DocumentContextMenu
          document={document}
          menuPosition={menuPosition}
          onCloseMenu={handleCloseMenu}
        />
      )}
    </div>
  )
}

Document.propTypes = {
  document: PropTypes.object.isRequired,
}

export default Document

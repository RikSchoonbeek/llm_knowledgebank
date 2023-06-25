import React from 'react'
import PropTypes from 'prop-types'

import '../../css/document-context-menu.css'

const DocumentContextMenu = ({ menuPosition, onCloseMenu }) => {
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
        <button className="menu-item">Edit</button>
        <button className="menu-item">Delete</button>
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

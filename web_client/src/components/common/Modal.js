import React from 'react'
import PropTypes from 'prop-types'

import '../../css/modal.css'

const Modal = ({ title, content, buttons }) => {
  return (
    <div className="modal-container">
      {title && <h2 className="modal-title-container">{title}</h2>}
      <div className="model-content-container">{content}</div>
      {buttons && <div className="modal-buttons-container">{buttons}</div>}
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  buttons: PropTypes.arrayOf(PropTypes.element),
}

export default Modal

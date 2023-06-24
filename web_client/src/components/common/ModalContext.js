import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null)

  const modalWithBackDrop =
    modal !== null ? (
      <div id="main-content-overlay">
        <div id="main-modal-container">{modal}</div>
      </div>
    ) : null

  return (
    <ModalContext.Provider value={{ modal: modalWithBackDrop, setModal }}>
      {children}
    </ModalContext.Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.any,
}

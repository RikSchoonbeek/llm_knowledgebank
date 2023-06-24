import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { DocumentsProvider } from './components/Document/DocumentsContext'
import { ModalProvider } from './components/common/ModalContext'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ModalProvider>
      <DocumentsProvider>
        <App />
      </DocumentsProvider>
    </ModalProvider>
  </React.StrictMode>
)

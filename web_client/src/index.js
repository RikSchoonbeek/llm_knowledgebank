import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { DocumentsProvider } from './components/Document/DocumentsContext'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <DocumentsProvider>
      <App />
    </DocumentsProvider>
  </React.StrictMode>
)

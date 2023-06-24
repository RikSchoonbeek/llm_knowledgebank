import React, { useContext } from 'react'

import DocumentOverview from './components/Document/DocumentOverview'
import { ModalContext } from './components/common/ModalContext'

import './App.css'

function App() {
  const { modal } = useContext(ModalContext)
  return (
    <div className="App">
      <DocumentOverview />
      <main>
        <h1>Document Management System</h1>
      </main>
      {modal}
    </div>
  )
}

export default App

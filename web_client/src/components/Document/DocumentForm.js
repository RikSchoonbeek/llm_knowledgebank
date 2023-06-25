import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { getDocumentFormConfig } from './formConfigs'
import FormComponent from '../common/form/FormComponent'
import { ModalContext } from '../common/ModalContext'
import useDocuments from './useDocuments'

import '../../css/document-form.css'

const DocumentForm = ({ document }) => {
  const {
    createDocument,
    documentFormData,
    resetDocumentFormData,
    setDocumentFormData,
    tags,
    updateDocument,
  } = useDocuments()
  const { setModal } = useContext(ModalContext)
  const formMode = document ? 'edit' : 'create'
  const formConfig = getDocumentFormConfig(formMode)
  const formDataReady = !!tags

  useEffect(
    () => resetDocumentFormData(document),
    [document, resetDocumentFormData]
  )

  const handleFormChange = (fieldName, fieldValue) => {
    setDocumentFormData({ ...documentFormData, [fieldName]: fieldValue })
  }

  const renderButtons = () => {
    const buttons = [
      <button
        onClick={() => {
          resetDocumentFormData()
          setModal(null)
        }}
        key="cancel"
      >
        Cancel
      </button>,
    ]

    if (formMode === 'create') {
      buttons.push(
        <button
          onClick={(e) => {
            // I think this prevents a re-render that has the below request fail.
            e.preventDefault()
            createDocument()
          }}
          key="submit"
        >
          Create
        </button>
      )
    } else if (formMode === 'edit') {
      buttons.push(
        <button
          onClick={(e) => {
            // I think this prevents a re-render that has the below request fail.
            e.preventDefault()
            updateDocument(document.id)
          }}
          key="submit"
        >
          Update
        </button>
      )
    }

    return buttons
  }

  return formDataReady ? (
    <FormComponent
      onChange={handleFormChange}
      formConfig={formConfig}
      values={documentFormData}
      errors={{}}
      fieldOptions={{
        tags: tags.map((tag) => ({ id: tag.id, label: tag.name })),
      }}
      buttons={renderButtons()}
    />
  ) : (
    <p>Loading...</p>
  )
}

DocumentForm.propTypes = {
  document: PropTypes.object,
}

export default DocumentForm

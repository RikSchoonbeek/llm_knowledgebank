import React, { useContext } from 'react'

import { documentFormConfig } from './formConfigs'
import FormComponent from '../common/form/FormComponent'
import { ModalContext } from '../common/ModalContext'
import useDocuments from './useDocuments'

const DocumentForm = () => {
  const {
    createDocument,
    documentFormData,
    resetDocumentFormData,
    setDocumentFormData,
    tags,
  } = useDocuments()
  const { setModal } = useContext(ModalContext)
  const formDataReady = !!tags

  const handleFormChange = (fieldName, fieldValue) => {
    setDocumentFormData({ ...documentFormData, [fieldName]: fieldValue })
  }

  return formDataReady ? (
    <FormComponent
      onChange={handleFormChange}
      formConfig={documentFormConfig}
      values={documentFormData}
      errors={{}}
      fieldOptions={{
        tags: tags.map((tag) => ({ id: tag.id, label: tag.name })),
      }}
      buttons={[
        <button
          onClick={() => {
            resetDocumentFormData()
            setModal(null)
          }}
          key="cancel"
        >
          Cancel
        </button>,
        <button onClick={createDocument} key="submit">
          Create
        </button>,
      ]}
    />
  ) : (
    <p>Loading...</p>
  )
}

DocumentForm.propTypes = {}

export default DocumentForm

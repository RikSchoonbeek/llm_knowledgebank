// Form config with elements that are common for both create and edit modes
const baseDocumentFormConfig = {
  formName: 'documentForm',
  formFields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter document name',
      field_validation: {
        required: true,
      },
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      placeholder: 'Enter document description',
      field_validation: {
        required: true,
      },
    },
    {
      type: 'select',
      name: 'tags',
      label: 'Tags',
      field_validation: {
        required: true,
      },
    },
  ],
}

export const getDocumentFormConfig = (formMode) => {
  // Add file field for create mode, as it is not editable. Another file means a new document.
  const formConfig = { ...baseDocumentFormConfig }
  if (formMode === 'create') {
    formConfig.formFields.push({
      type: 'file',
      name: 'content',
      label: 'File',
      field_validation: {
        required: true,
      },
    })
  }
  return formConfig
}

export const documentFormConfig = {
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
    {
      type: 'file',
      name: 'content',
      label: 'File',
      field_validation: {
        required: true,
      },
    },
  ],
}

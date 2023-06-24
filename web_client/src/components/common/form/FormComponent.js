import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import CheckBoxInput from './CheckBoxInput'
import RadioGroup from './RadioGroup'
import TextArea from './TextArea'
import TextInput from './TextInput'

import '../../../css/formcomponent.css'
import SelectInput from './SelectInput'
import FileInput from './FileInput'

const FormComponent = ({
  buttonHandlers,
  formConfig,
  onChange,
  errors,
  values,
  fieldOptions,
}) => {
  const { formFields, buttons } = formConfig

  // TODO apply field validation
  return (
    <form name={formConfig.formName} className="form-component-container">
      {formFields.map((field) => {
        const fieldValue = values[field.name]
        const fieldErrors = errors[field.name]
        const dynamicOptions = fieldOptions[field.name]
        if (field.type === 'text' || field.type === 'email') {
          return (
            <TextInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )
        } else if (field.type === 'group') {
          return (
            <RadioGroup
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
              options={dynamicOptions}
            />
          )
        } else if (field.type === 'checkbox') {
          return (
            <CheckBoxInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )
        } else if (field.type === 'textArea') {
          return (
            <TextArea
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              readOnly={field.readOnly}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )
        } else if (field.type === 'select') {
          return (
            <SelectInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(name, value) => onChange(name, value)}
              options={dynamicOptions}
            />
          )
        } else if (field.type === 'file') {
          return (
            <FileInput
              key={field.name}
              field={field}
              // value doesn't seem possible or required here
              errors={fieldErrors}
              onChange={(fieldName, fieldValue) =>
                onChange(fieldName, fieldValue)
              }
            />
          )
        }
        return null
      })}
      {buttons &&
        buttons.map((button, i) => {
          const clickHandler = buttonHandlers[button.onClick]
          return <Button key={i} button={button} onClick={clickHandler} />
        })}
    </form>
  )
}

// Set prop types
FormComponent.propTypes = {
  // The elements of the form and their configuration
  formConfig: PropTypes.object.isRequired,
  // The functions that will be called on change of the corresponding input
  onChange: PropTypes.func.isRequired,
  // The values of the form inputs
  values: PropTypes.object.isRequired,
  // The options for fields that have options
  fieldOptions: PropTypes.object,
  // The errors of the form inputs
  errors: PropTypes.object,
  // The functions that will be called on click of the corresponding button
  buttonHandlers: PropTypes.object,
}

export default FormComponent

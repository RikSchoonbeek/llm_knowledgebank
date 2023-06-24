import React from 'react'
import PropTypes from 'prop-types'

import ErrorArea from './ErrorArea'

const TextInput = ({ field, value, errors, onChange }) => (
  // Used for text and email inputs
  <div className="field-container">
    <label>{field.label}</label>
    <input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      required={field.required}
      onChange={onChange}
    />
    <ErrorArea errors={errors} />
  </div>
)

TextInput.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
  }),
  onChange: PropTypes.func,
  value: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default TextInput

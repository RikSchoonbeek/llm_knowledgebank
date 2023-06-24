import React from 'react'
import PropTypes from 'prop-types'

import ErrorArea from './ErrorArea'

const FileInput = ({ field, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <input
      type="file"
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      onChange={(event) => onChange(field.name, event.target.files[0])}
    />
    <ErrorArea errors={errors} />
  </div>
)

FileInput.propTypes = {
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

export default FileInput

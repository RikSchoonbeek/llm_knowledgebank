import PropTypes from 'prop-types'
import React from 'react'

import ErrorArea from './ErrorArea'

const RadioGroup = ({ field, value, errors, onChange, options }) => {
  // Options can be passed in as a prop or as part of the field.
  const getOptions = () => options || field.options
  return (
    <div className="field-container">
      <label>{field.label}</label>
      {getOptions().map((option, i) => (
        <label key={i}>
          {option.label}
          <input
            type="radio"
            name={field.name}
            value={option.value}
            checked={value === option.value}
            required={field.required}
            onChange={onChange}
          />
        </label>
      ))}
      <ErrorArea errors={errors} />
    </div>
  )
}

RadioGroup.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    required: PropTypes.bool,
  }),
  value: PropTypes.any,
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
}

export default RadioGroup

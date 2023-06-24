import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ErrorArea from './ErrorArea'
import { Autocomplete, TextField } from '@mui/material'

const SelectInput = ({ field, value, errors, onChange, options }) => {
  const [inputValue, setInputValue] = useState('')
  const fieldOptions = options || field.options
  return (
    // Used for text and email inputs
    <div className="field-container">
      <Autocomplete
        value={value}
        inputValue={inputValue}
        multiple
        options={fieldOptions}
        onChange={(e, newValue) => onChange(field.name, newValue)}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => <TextField {...params} label={field.label} />}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <ErrorArea errors={errors} />
    </div>
  )
}

SelectInput.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.any,
      })
    ),
  }),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  errors: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.any,
    })
  ),
}

export default SelectInput

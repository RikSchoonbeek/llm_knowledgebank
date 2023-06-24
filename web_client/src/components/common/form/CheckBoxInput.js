import PropTypes from 'prop-types'
import React from 'react'

import ErrorArea from './ErrorArea'

const CheckBoxInput = ({ field, value, errors }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <input type="checkbox" name={field.name} checked={value} />
    <ErrorArea errors={errors} />
  </div>
)

CheckBoxInput.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
  }),
  value: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default CheckBoxInput

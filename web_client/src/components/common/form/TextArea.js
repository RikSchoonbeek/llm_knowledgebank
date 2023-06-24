import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import ErrorArea from './ErrorArea'

const TextAreaInput = ({ field, value, errors, onChange, readOnly }) => {
  const textAreaRef = useRef(null)

  useEffect(() => {
    textAreaRef.current.style.height = 'inherit'
    const scrollHeight = textAreaRef.current.scrollHeight
    textAreaRef.current.style.height = `${scrollHeight}px`
  }, [value])

  return (
    <div className="field-container">
      <label>{field.label}</label>
      <textarea
        ref={textAreaRef}
        style={{
          height: 'auto',
          maxHeight: '200px', // you would adjust this to be the equivalent of 10 lines of text
          overflowY: 'auto',
        }}
        name={field.name}
        placeholder={field.placeholder}
        value={value}
        required={field.required}
        onChange={onChange}
        readOnly={readOnly}
      />
      <ErrorArea errors={errors} />
    </div>
  )
}

TextAreaInput.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    // TODO zit deze wel in field? Of in field.field_validation ?
    required: PropTypes.bool,
  }),
  value: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
}

export default TextAreaInput

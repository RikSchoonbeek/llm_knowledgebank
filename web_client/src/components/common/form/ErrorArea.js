import PropTypes from 'prop-types'
import React from 'react'

const ErrorArea = ({ errors }) => {
  if (errors) {
    return (
      <div className="error-area">
        {errors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
      </div>
    )
  }
}

ErrorArea.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default ErrorArea

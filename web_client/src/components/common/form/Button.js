import PropTypes from 'prop-types'
import React from 'react'

const Button = ({ button, onClick }) => (
  <button type={button.type} onClick={onClick}>
    {button.label}
  </button>
)

Button.propTypes = {
  button: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
  }),
  onClick: PropTypes.func,
}

export default Button

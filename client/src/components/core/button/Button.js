import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({ children, type, className, disabled }) => (
  <button className={`button ${className}`} type={type} disabled={disabled}>
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

Button.defaultTypes = {
  type: '',
  className: '',
  disabled: false,
}

export default Button

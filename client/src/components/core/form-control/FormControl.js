import React from 'react'
import './FormControl.scss'
import PropTypes from 'prop-types'

const FormControl = ({
  type,
  required,
  placeholder,
  name,
  helper,
  value,
  className,
}) => (
  <div className={`form-control ${className}`}>
    <input
      className="form-control__input"
      type={type}
      required={required}
      placeholder={placeholder}
      name={name}
      defaultValue={value}
    />
    {helper && <span className="form-control__helper">{helper}</span>}
  </div>
)

FormControl.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  helper: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
}

FormControl.defaultTypes = {
  required: false,
  placeholder: '',
  name: '',
  helper: '',
  value: '',
  className: '',
}

export default FormControl

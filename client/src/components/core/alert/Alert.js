import React from 'react'
import PropTypes from 'prop-types'
import './Alert.scss'

const Alert = ({ message, type }) => (
  <div
    className={`alert ${type === 'error' && 'error'} ${
      type === 'success' && 'success'
    }`}
  >
    {message}
  </div>
)

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Alert

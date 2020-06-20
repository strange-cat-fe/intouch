import React from 'react'
import PropTypes from 'prop-types'
import './Container.scss'

const Container = ({ children, width }) => (
  <div
    className={`container ${width === 'sm' && 'sm'} ${width === 'md' && 'md'} ${
      width === 'lg' && 'lg'
    }`}
  >
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.any.isRequired,
  width: PropTypes.string.isRequired,
}

export default Container

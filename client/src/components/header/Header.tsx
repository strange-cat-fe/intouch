import React from 'react'
import classes from './Header.module.css'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <div className={classes.header}>
    <p className={classes.text}>{title}</p>
  </div>
)

export default Header

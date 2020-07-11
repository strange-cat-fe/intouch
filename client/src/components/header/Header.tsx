import React from 'react'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { IoIosArrowBack as BackIcon } from 'react-icons/io'

interface HeaderProps {
  title: string
  link?: string
}

const Header: React.FC<HeaderProps> = ({ title, link }) => (
  <div className={classes.header}>
    {link && (
      <NavLink className={classes.link} to={link}>
        <BackIcon />
      </NavLink>
    )}
    <p className={classes.text}>{title}</p>
  </div>
)

export default Header

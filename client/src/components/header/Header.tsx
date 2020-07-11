import React from 'react'
import classes from './Header.module.css'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { IoIosArrowBack as BackIcon } from 'react-icons/io'

interface HeaderProps extends RouteComponentProps {
  title: string
  link?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, link, history }) => (
  <div className={classes.header}>
    {link && (
      <NavLink className={classes.link} to="/" onClick={() => history.goBack()}>
        <BackIcon />
      </NavLink>
    )}
    <p className={classes.text}>{title}</p>
  </div>
)

export default withRouter(Header)

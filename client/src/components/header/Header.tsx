import React, { useState, useEffect } from 'react'
import classes from './Header.module.css'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { IoIosArrowBack as BackIcon } from 'react-icons/io'

interface HeaderProps extends RouteComponentProps {
  title: string
  link?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, link, history }) => {
  const [width, setWidth] = useState(0)

  const updateWidth = () => setWidth(window.innerWidth)

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  if (width <= 768) {
    return (
      <div className={classes.header}>
        {link && (
          <NavLink
            className={classes.link}
            to="/"
            onClick={() => history.goBack()}
          >
            <BackIcon />
          </NavLink>
        )}
        <p className={classes.text}>{title}</p>
      </div>
    )
  }

  return (
    <div className={classes.headerDesk}>
      {link && (
        <NavLink
          className={classes.linkDesk}
          to="/"
          onClick={() => history.goBack()}
        >
          <BackIcon />
        </NavLink>
      )}
      <p className={classes.textDesk}>{title}</p>
    </div>
  )
}

export default withRouter(Header)

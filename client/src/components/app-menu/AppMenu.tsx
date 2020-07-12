import React, { useState, useEffect } from 'react'
import classes from './AppMenu.module.css'
import { NavLink } from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import { RiFileList2Line as FeedIcon } from 'react-icons/ri'
import { FaUser as ProfileIcon } from 'react-icons/fa'

const AppMenu: React.FC = () => {
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
      <div className={classes.menu}>
        <NavLink
          className={classes.link}
          activeClassName={classes.active}
          to="/feed"
        >
          <Box as={FeedIcon} size="24px" />
        </NavLink>
        <NavLink
          className={classes.link}
          activeClassName={classes.active}
          to="/profile"
        >
          <Box as={ProfileIcon} size="24px" />
        </NavLink>
      </div>
    )
  }

  return (
    <div className={classes.menuDesk}>
      <div className={classes.links}>
        <NavLink
          className={classes.linkDesk}
          activeClassName={classes.linkDeskActive}
          to="/feed"
        >
          Feed
        </NavLink>
        <NavLink
          className={classes.linkDesk}
          activeClassName={classes.linkDeskActive}
          to="/profile"
        >
          Profile
        </NavLink>
      </div>
    </div>
  )
}

export default AppMenu

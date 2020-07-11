import React from 'react'
import classes from './AppMenu.module.css'
import { NavLink } from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import { RiFileList2Line as FeedIcon } from 'react-icons/ri'

const AppMenu: React.FC = () => (
  <div className={classes.menu}>
    <NavLink
      className={classes.link}
      activeClassName={classes.active}
      to="/feed"
    >
      <Box as={FeedIcon} size="24px" />
    </NavLink>
  </div>
)

export default AppMenu

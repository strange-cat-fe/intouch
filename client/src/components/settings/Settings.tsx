import React, { useState, useEffect } from 'react'
import classes from './Settings.module.css'
import Header from '../header/Header'
import { NavLink } from 'react-router-dom'
import { Switch, Select } from '@chakra-ui/core'
import AppMenu from '../app-menu/AppMenu'

const Settings: React.FC = () => {
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
      <div className={classes.settings}>
        <Header title="Settings" link />
        <NavLink className={classes.link} to="/settings/username">
          Change username
        </NavLink>
        <NavLink className={classes.link} to="/settings/password">
          Change password
        </NavLink>
        <div className={classes.theme}>
          Enable Dark Mode
          <Switch color="blue" />
        </div>
        <div className={classes.language}>
          <span className={classes.text}>Language</span>
          <Select placeholder="Language" backgroundColor="#eee">
            <option value="english">English</option>
            <option value="russian">Русский</option>
          </Select>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.settings}>
      <Header title="Settings" link />
      <div className={classes.container}>
        <NavLink className={classes.link} to="/settings/username">
          Change username
        </NavLink>
        <NavLink className={classes.link} to="/settings/password">
          Change password
        </NavLink>
        <div className={classes.theme}>
          Enable Dark Mode
          <Switch color="blue" />
        </div>
        <div className={classes.language}>
          <span className={classes.text}>Language</span>
          <Select placeholder="Language" backgroundColor="#eee">
            <option value="english">English</option>
            <option value="russian">Русский</option>
          </Select>
        </div>
      </div>
      <AppMenu />
    </div>
  )
}

export default Settings

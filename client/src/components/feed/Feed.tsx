import React from 'react'
import classes from './Feed.module.css'
import Header from '../header/Header'
import AppMenu from '../app-menu/AppMenu'
import { Avatar } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'
import Post from './post/Post'

const Feed: React.FC = () => (
  <div className={classes.feed}>
    <Header title="Feed" />
    <div className={classes.newPost}>
      <Avatar name="Kirill Kumma" src="" />
      <NavLink className={classes.link} to="/feed/new">
        Write new post here...
      </NavLink>
    </div>
    <Post />
    <AppMenu />
  </div>
)

export default Feed

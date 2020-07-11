import React, { useEffect } from 'react'
import classes from './Feed.module.css'
import Header from '../header/Header'
import AppMenu from '../app-menu/AppMenu'
import { Avatar, Progress } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'
import { Post } from '../../types/feed'
import { Waypoint } from 'react-waypoint'
import PostContainer from '../../containers/post/PostContainer'
import { FeedProps } from '../../containers/feed/FeedContainer'

const Feed: React.FC<FeedProps> = ({ posts, loading, user, setPosts }) => {
  useEffect(() => {
    posts.length === 0 && setPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.feed}>
      <Header title="Feed" />
      <div className={classes.newPost}>
        <Avatar name={user.username} src="" />
        <NavLink className={classes.link} to="/feed/new">
          Write new post here...
        </NavLink>
      </div>
      <div className={classes.container}>
        {(posts as Post[]).map((p: Post, i: number) => {
          if (i === posts.length - 1) {
            return (
              <React.Fragment key={p._id}>
                <Waypoint onEnter={() => setPosts()} />
                <PostContainer {...p} />
              </React.Fragment>
            )
          } else {
            return <PostContainer {...p} key={p._id} />
          }
        })}
      </div>
      {loading && <Progress isAnimated hasStripe value={100} />}
      <AppMenu />
    </div>
  )
}

export default Feed

import React, { useEffect, useState } from 'react'
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
  const [width, setWidth] = useState(0)

  const updateWidth = () => setWidth(window.innerWidth)

  useEffect(() => {
    updateWidth()
    posts.length === 0 && setPosts()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line
  const filteredPosts = posts.filter(p => {
    for (let i = 0; i < user.following.length; i++) {
      if (p.author._id === user.following[i]._id) {
        return p
      }
    }
  })

  if (width <= 768) {
    return (
      <div className={classes.feed}>
        <Header title="Feed" />
        <div className={classes.newPost}>
          <Avatar name={user.username} src={user.img} />
          <NavLink className={classes.link} to="/feed/new">
            Write new post here...
          </NavLink>
        </div>
        <div className={classes.container}>
          {(filteredPosts as Post[]).map((p: Post, i: number) => {
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
          {filteredPosts.length === 0 && (
            <div className={classes.placeholder}>
              No posts yet <br /> follow other users <br /> to see their posts
            </div>
          )}
        </div>
        {loading && <Progress isAnimated hasStripe value={100} />}
        <AppMenu />
      </div>
    )
  }

  return (
    <div className={classes.feedDesk}>
      <Header title="Feed" />
      <div className={classes.desk}>
        <div className={classes.newPost}>
          <Avatar name={user.username} src="" />
          <NavLink className={classes.link} to="/feed/new">
            Write new post here...
          </NavLink>
        </div>
        <div className={classes.containerDesk}>
          {(filteredPosts as Post[]).map((p: Post, i: number) => {
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
          {filteredPosts.length === 0 && (
            <div className={classes.placeholder}>
              No posts yet <br /> follow other users <br /> to see their posts
            </div>
          )}
        </div>
        {loading && <Progress isAnimated hasStripe value={100} />}
      </div>
      <AppMenu />
    </div>
  )
}

export default Feed

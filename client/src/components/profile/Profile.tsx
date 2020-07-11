import React, { useEffect } from 'react'
import classes from './Profile.module.css'
import Header from '../header/Header'
import AppMenu from '../app-menu/AppMenu'
import { Avatar, Progress } from '@chakra-ui/core'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { Post } from '../../types/feed'
import PostContainer from '../../containers/post/PostContainer'
import { Waypoint } from 'react-waypoint'
import { ProfileProps } from '../../containers/profile/ProfileContainer'

const Profile: React.FC<ProfileProps & RouteComponentProps> = ({
  username,
  loading,
  posts,
  match,
  currentUser,
  setProfileInfo,
  setPosts,
}) => {
  useEffect(() => {
    setProfileInfo(
      (match as any).params.username ? (match as any).params.username : null,
    )

    posts.length === 0 && setPosts()

    window.scrollTo(0, 0)

    return () => {
      setProfileInfo(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const usersPosts = (posts as Post[]).filter(
    p => p.author.username === username,
  )

  return (
    <div className={classes.profile}>
      <Header title="Profile" />
      <div className={classes.info}>
        {username && <Avatar name={username} src="" />}
        <div className={classes.username}>{username}</div>
      </div>
      {((match as any).params.username === currentUser ||
        !(match as any).params.username) && (
        <NavLink className={classes.btn} to="/profile/settings">
          Settings
        </NavLink>
      )}
      {((match as any).params.username === currentUser ||
        !(match as any).params.username) && (
        <div className={classes.newPost}>
          <NavLink className={classes.link} to="/feed/new">
            Write new post here...
          </NavLink>
        </div>
      )}
      <div className={classes.container}>
        {usersPosts.map((p, i) => {
          if (i === usersPosts.length - 1) {
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
        {loading && <Progress isAnimated hasStripe value={100} />}
      </div>
      <AppMenu />
    </div>
  )
}

export default withRouter(Profile)

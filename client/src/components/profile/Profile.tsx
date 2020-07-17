import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import Header from '../header/Header'
import AppMenu from '../app-menu/AppMenu'
import { Avatar, Progress } from '@chakra-ui/core'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { Post } from '../../types/feed'
import PostContainer from '../../containers/post/PostContainer'
import { Waypoint } from 'react-waypoint'
import { ProfileProps } from '../../containers/profile/ProfileContainer'

interface Params {
  username?: string
}

const Profile: React.FC<ProfileProps & RouteComponentProps<Params>> = ({
  username,
  img,
  loading,
  posts,
  match,
  currentUser,
  setProfileInfo,
  setPosts,
}) => {
  const [width, setWidth] = useState(0)

  const updateWidth = () => setWidth(window.innerWidth)

  useEffect(() => {
    updateWidth()
    setProfileInfo(match.params.username ? match.params.username : null)

    posts.length === 0 && setPosts()

    window.scrollTo(0, 0)

    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
      setProfileInfo(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const usersPosts = (posts as Post[]).filter(
    p => p.author.username === username,
  )

  if (width <= 768) {
    return (
      <div className={classes.profile}>
        <Header title="Profile" />
        <div className={classes.info}>
          {username && <Avatar name={username} src={img!} />}
          <div className={classes.username}>{username}</div>
        </div>
        {match.params.username === currentUser ||
          (!match.params.username && (
            <NavLink className={classes.btn} to="/settings">
              Settings
            </NavLink>
          ))}
        {match.params.username === currentUser ||
          (!match.params.username && (
            <div className={classes.newPost}>
              <NavLink className={classes.link} to="/feed/new">
                Write new post here...
              </NavLink>
            </div>
          ))}
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

  return (
    <div className={classes.profileDesk}>
      <Header title="Profile" />
      <div className={classes.desk}>
        <div className={classes.info}>
          {username && <Avatar name={username} src="" />}
          <div className={classes.username}>{username}</div>
        </div>
        {match.params.username === currentUser ||
          (!match.params.username && (
            <NavLink className={classes.btn} to="/settings">
              Settings
            </NavLink>
          ))}
        {match.params.username === currentUser ||
          (!match.params.username && (
            <div className={classes.newPost}>
              <NavLink className={classes.link} to="/feed/new">
                Write new post here...
              </NavLink>
            </div>
          ))}
        <div className={classes.containerDesk}>
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
      </div>
      <AppMenu />
    </div>
  )
}

export default withRouter(Profile)

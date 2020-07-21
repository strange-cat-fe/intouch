import React, { useState } from 'react'
import classes from './Post.module.css'
import { Avatar, Image, Divider } from '@chakra-ui/core'
import { MdFavoriteBorder as LikeIcon } from 'react-icons/md'
import { MdFavorite as LikeActiveIcon } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { PostProps } from '../../../containers/post/PostContainer'
import { FcComments as CommentsIcon } from 'react-icons/fc'

const PostComponent: React.FC<PostProps> = ({
  author,
  text,
  likes,
  img,
  date,
  _id,
  userId,
  comments,
  setLike,
}) => {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <Avatar name={author.username} src={author.img} />
        <div className={classes.data}>
          <NavLink
            className={classes.author}
            to={`/profile/${author.username}`}
          >
            {author.username}
          </NavLink>
          <p className={classes.date}>{date}</p>
        </div>
      </div>
      <div className={classes.text}>{text}</div>
      <div className={classes.media}>
        <Image className={classes.img} src={img} />
      </div>
      {!img && <Divider />}
      <div className={classes.actions}>
        <div className={classes.likes}>
          <button className={classes.btn} onClick={() => setLike(_id)}>
            {likes.filter(l => l === userId).length === 0 ? (
              <LikeIcon />
            ) : (
              <LikeActiveIcon />
            )}
          </button>
          {likes.length}
        </div>
        <div
          className={classes.commentsBtn}
          onClick={() => setShowComments(!showComments)}
        >
          <CommentsIcon />
        </div>
      </div>
      {showComments && (
        <div className={classes.comments}>
          {comments.map(c => {
            return (
              <div className={classes.comment} key={c._id}>
                <Avatar src={c.author.img} name={c.author.username} />
                <p className={classes.text}>{c.text}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PostComponent

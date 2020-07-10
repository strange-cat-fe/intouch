import React from 'react'
import classes from './Post.module.css'
import { Avatar, Image, Divider } from '@chakra-ui/core'
import { MdFavoriteBorder as LikeIcon } from 'react-icons/md'
import { MdFavorite as LikeActiveIcon } from 'react-icons/md'
import { Post } from '../../../types/feed'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../../store'
import { Action } from 'redux'

export interface PostProps extends Post {
  userId: string
  setLike: (
    postId: string,
  ) => ThunkAction<void, AppState, unknown, Action<string>>
}

const PostComponent: React.FC<PostProps> = ({
  author,
  text,
  likes,
  img,
  date,
  _id,
  userId,
  setLike,
}) => (
  <div className={classes.post}>
    <div className={classes.header}>
      <Avatar name={author.username} src="" />
      <div className={classes.data}>
        <p className={classes.author}>{author.username}</p>
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
    </div>
  </div>
)

export default PostComponent

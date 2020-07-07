import React from 'react'
import classes from './Post.module.css'
import { Avatar, Image, IconButton } from '@chakra-ui/core'
import { MdFavoriteBorder as LikeIcon } from 'react-icons/md'

const Post: React.FC = () => (
  <div className={classes.post}>
    <div className={classes.header}>
      <Avatar name="Kirill Kumma" src="" />
      <div className={classes.data}>
        <p className={classes.author}>Kirill Kumma</p>
        <p className={classes.date}>Today</p>
      </div>
    </div>
    <div className={classes.text}>What's up niggers</div>
    <div className={classes.media}>
      <Image src="https://media1.tenor.com/images/b08cd90b6e5fcb73e637a27bc4ee9cc0/tenor.gif?itemid=17506944" />
    </div>
    <div className={classes.actions}>
      <div className={classes.likes}>
        <button className={classes.btn}>
          <LikeIcon />
        </button>
        999
      </div>
    </div>
  </div>
)

export default Post

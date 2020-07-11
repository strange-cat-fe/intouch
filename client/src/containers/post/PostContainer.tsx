import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import PostComponent from '../../components/feed/post/Post'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../store'
import { Action } from 'redux'
import { setLike } from '../../actions/feed'
import { Post } from '../../types/feed'

const PostContainer: React.FC<PostProps> = props => <PostComponent {...props} />

interface LinkStateToProps {
  userId: string
}

interface LinkDispatchToProps {
  setLike: (
    postId: string,
  ) => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    userId: state.auth.user!.userId,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  setLike,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PostProps = ConnectedProps<typeof connector> & Post

export default connector(PostContainer)

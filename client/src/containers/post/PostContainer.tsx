import React from 'react'
import { connect } from 'react-redux'
import PostComponent, { PostProps } from '../../components/feed/post/Post'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../store'
import { Action } from 'redux'
import { setLike } from '../../actions/feed'

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostContainer as any)

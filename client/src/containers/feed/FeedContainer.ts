import { connect, ConnectedProps } from 'react-redux'
import Feed from '../../components/feed/Feed'
import { Post } from '../../types/feed'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../store'
import { Action } from 'redux'
import { setPosts } from '../../actions/feed'

interface LinkStateToProps {
  posts: Post[] | []
  loading: boolean
  user: {
    userId: string
    username: string
    img: string
    following: Array<{
      username: string
      _id: string
    }>
  }
}

interface LinkDispatchToProps {
  setPosts: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    posts: state.feed.posts,
    loading: state.feed.loading,
    user: {
      userId: state.auth.user!.userId,
      username: state.auth.user!.username,
      img: state.auth.user!.img,
      following: state.auth.user!.following,
    },
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  setPosts,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type FeedProps = ConnectedProps<typeof connector>

export default connector(Feed)

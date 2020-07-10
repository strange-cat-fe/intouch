import { connect } from 'react-redux'
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
    },
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  setPosts,
}

// TODO: fix typechecking error
export default connect(mapStateToProps, mapDispatchToProps)(Feed as any)

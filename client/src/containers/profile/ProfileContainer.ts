import { connect, ConnectedProps } from 'react-redux'
import Profile from '../../components/profile/Profile'
import { Post } from '../../types/feed'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../store'
import { Action } from 'redux'
import { setProfileInfo } from '../../actions/profile'
import { setPosts } from '../../actions/feed'

interface LinkStateToProps {
  username: string | null
  loading: boolean
  posts: Post[] | []
  currentUser: string
}

interface LinkDispatchToProps {
  setProfileInfo: (
    username: string | null,
  ) => ThunkAction<void, AppState, unknown, Action<string>>
  setPosts: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    username: state.profile.username,
    loading: state.feed.loading,
    posts: state.feed.posts,
    currentUser: state.auth.user!.username,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  setProfileInfo,
  setPosts,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ProfileProps = ConnectedProps<typeof connector>

export default connector(Profile)

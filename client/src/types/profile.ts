import { Post } from './feed'
import { SET_PROFILE_INFO } from '../constants/profile'

export interface ProfileState {
  username: string | null
  posts: Post[] | []
}

export interface SetProfileAction {
  type: typeof SET_PROFILE_INFO
  payload: {
    username: string
  }
}

export type ProfileActionTypes = SetProfileAction

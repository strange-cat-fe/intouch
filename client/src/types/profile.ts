import { Post } from './feed'
import { SET_PROFILE_INFO } from '../constants/profile'

export interface ProfileState {
  username: string | null
  img: string | null
  posts: Post[] | []
  following: Array<{
    username: string
    _id: string
  }>
  followers: Array<{
    username: string
    _id: string
  }>
}

export interface SetProfileAction {
  type: typeof SET_PROFILE_INFO
  payload: {
    username: string
    following: Array<{
      username: string
      _id: string
    }>
    followers: Array<{
      username: string
      _id: string
    }>
  }
}

export type ProfileActionTypes = SetProfileAction

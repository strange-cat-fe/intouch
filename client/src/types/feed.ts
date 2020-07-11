import {
  SET_LOADING,
  SET_POSTS,
  SET_LIKE,
  UPDATE_FORM,
  ADD_POST,
} from '../constants/feed'

export interface FeedState {
  posts: Post[] | []
  loading: boolean
  page: number
  hasMore: boolean
  form: {
    text: string
    img: string
    valid: boolean
  }
  usersPosts: Post[] | []
}

export interface Post {
  author: {
    username: string
    _id: string
  }
  date: string
  _id: string
  text: string
  img: string
  likes: string[]
  __v: number
}

export interface SetLoadingAction {
  type: typeof SET_LOADING
  payload: boolean
}

export interface SetPostsAction {
  type: typeof SET_POSTS
  payload: Post[]
  hasMore: boolean
  page: number
}

export interface SetLikeAction {
  type: typeof SET_LIKE
  payload: Post[]
}

export interface UpdateFormAction {
  type: typeof UPDATE_FORM
  payload: {
    text: string
    img: string
    valid: boolean
  }
}

export interface AddPostAction {
  type: typeof ADD_POST
}

export type FeedActions =
  | SetLoadingAction
  | SetPostsAction
  | SetLikeAction
  | UpdateFormAction

import {
  FeedState,
  FeedActions,
  SetLoadingAction,
  SetPostsAction,
  SetLikeAction,
  UpdateFormAction,
} from '../types/feed'
import {
  SET_LOADING,
  SET_POSTS,
  SET_LIKE,
  UPDATE_FORM,
  ADD_POST,
} from '../constants/feed'

const initialState: FeedState = {
  posts: [],
  loading: false,
  page: 1,
  hasMore: true,
  form: {
    text: '',
    img: '',
    valid: false,
  },
  usersPosts: [],
}

export default (state = initialState, action: FeedActions): FeedState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: (action as SetLoadingAction).payload }
    case SET_POSTS:
      return {
        ...state,
        posts:
          (action as SetPostsAction).payload.length > 0
            ? [...state.posts, ...(action as SetPostsAction).payload]
            : (action as SetPostsAction).payload,
        page: (action as SetPostsAction).page,
        hasMore: (action as SetPostsAction).hasMore,
      }
    case SET_LIKE:
      return { ...state, posts: (action as SetLikeAction).payload }
    case UPDATE_FORM:
      return { ...state, form: (action as UpdateFormAction).payload }
    case ADD_POST:
      return state
    default:
      return state
  }
}

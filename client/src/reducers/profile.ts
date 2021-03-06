import {
  ProfileState,
  ProfileActionTypes,
  SetProfileAction,
} from '../types/profile'
import { SET_PROFILE_INFO } from '../constants/profile'

const initialState: ProfileState = {
  username: null,
  img: null,
  posts: [],
  following: [],
  followers: [],
}

export default (
  state = initialState,
  action: ProfileActionTypes,
): ProfileState => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...state, ...(action as SetProfileAction).payload }
    default:
      return state
  }
}

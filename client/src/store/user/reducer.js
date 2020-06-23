import { SET_USER } from './types'

const initialState = {
  username:
    localStorage.getItem('User') &&
    JSON.parse(localStorage.getItem('User')).username,
  _id:
    localStorage.getItem('User') &&
    JSON.parse(localStorage.getItem('User')).userId,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}

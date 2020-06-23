import { SET_USER } from './types'

export const setUser = () => ({
  type: SET_USER,
  payload: {
    username: JSON.parse(localStorage.getItem('User')).username,
    _id: JSON.parse(localStorage.getItem('User')).userId,
  },
})

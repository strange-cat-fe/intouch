import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'
import { Action } from 'redux'
import { SET_PROFILE_INFO } from '../constants/profile'

export const setProfileInfo = (
  username: string | null,
): ThunkAction<void, AppState, unknown, Action<string>> => async (
  dispatch,
  getState,
) => {
  const response = await fetch(
    `http://localhost:5000/api/profile/${
      username ? username : getState().auth.user!.username
    }/info?token=${JSON.parse(sessionStorage.getItem('accessToken')!)}`,
  )
  const result = await response.json()

  dispatch({
    type: SET_PROFILE_INFO,
    payload: result.data,
  })
}

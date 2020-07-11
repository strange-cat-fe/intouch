import {
  SET_LOADING,
  SET_POSTS,
  SET_LIKE,
  UPDATE_FORM,
  ADD_POST,
} from '../constants/feed'
import { SetLoadingAction, UpdateFormAction } from '../types/feed'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'
import { Action } from 'redux'
import moment from 'moment'

export const setLoading = (loading: boolean): SetLoadingAction => {
  return {
    type: SET_LOADING,
    payload: loading,
  }
}

export const setPosts = (): ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  if (getState().feed.hasMore) {
    dispatch(setLoading(true))

    const response = await fetch(
      `http://localhost:5000/api/posts?page=${
        getState().feed.page
      }&token=${JSON.parse(sessionStorage.getItem('accessToken')!)}`,
    )
    const result = await response.json()

    dispatch({
      type: SET_POSTS,
      payload: result.data.posts,
      hasMore: result.data.next ? true : false,
      page: getState().feed.page + 1,
    })

    dispatch(setLoading(false))
  }
}

export const setLike = (
  postId: string,
): ThunkAction<void, AppState, unknown, Action<string>> => async (
  dispatch,
  getState,
) => {
  const token = JSON.parse(sessionStorage.getItem('accessToken')!)
  const userId = getState().auth.user!.userId

  fetch(`http://localhost:5000/api/posts/${postId}/like?token=${token}`)

  const posts = [...getState().feed.posts]

  for (let i = 0; i < posts.length; i++) {
    if (posts[i]._id === postId) {
      if (posts[i].likes.filter(l => l === userId).length === 0) {
        posts[i].likes = [...posts[i].likes, userId]
      } else {
        posts[i].likes = posts[i].likes.filter(l => l !== userId)
      }
    }
  }

  dispatch({
    type: SET_LIKE,
    payload: posts,
  })
}

export const updateForm = (form: {
  text: string
  img: string
}): UpdateFormAction => {
  return {
    type: UPDATE_FORM,
    payload: {
      text: form.text,
      img: form.img,
      valid: form.text.length > 0,
    },
  }
}

export const addPost = (): ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  const { text, img } = getState().feed.form

  await fetch(
    `http://localhost:5000/api/posts/new?token=${JSON.parse(
      sessionStorage.getItem('accessToken')!,
    )}`,
    {
      method: 'POST',
      body: JSON.stringify({
        text,
        img,
        date: moment().format('LL') + ' at ' + moment().format('LT'),
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )

  dispatch({
    type: SET_POSTS,
    hasMore: true,
    page: 1,
    payload: [],
  })

  dispatch(updateForm({ text: '', img: '' }))

  dispatch(setPosts())

  dispatch({
    type: ADD_POST,
  })
}

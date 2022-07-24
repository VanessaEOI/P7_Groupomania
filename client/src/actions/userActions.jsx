import axios from 'axios'

export const GET_USER = 'GET_USER'
export const GET_USER_ERRORS = 'GET_USER_ERRORS'
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE'

// Retreive data and send to reducer
export function getUser(uid) {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((error) => console.log(error))
  }
}

export function uploadPicture(data, id) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors })
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: '' })
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
            })
        }
      })
      .catch((error) => console.log(error))
  }
}

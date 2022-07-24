import axios from 'axios'

export const GET_USERS = 'GET_USERS'
export const GET_USER_ERRORS = 'GET_USER_ERRORS'

export function getUsers() {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data })
      })
      .catch((error) => console.log(error))
  }
}

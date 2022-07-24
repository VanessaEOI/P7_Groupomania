import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'

function Logout() {
  function removeCookie(key) {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  async function logout() {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((error) => console.log(error))

    window.location = '/'
  }

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout icon" />
    </li>
  )
}

export default Logout

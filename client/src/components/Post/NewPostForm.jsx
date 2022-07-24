import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, timestampParser } from '../Utils'
import { NavLink } from 'react-router-dom'
import { addPost, getPosts } from '../../actions/postActions'

function NewPostForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  // img front rendering
  const [postPicture, setPostPicture] = useState(null)
  // img back save
  const [file, setFile] = useState()

  // Stores redux
  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer.postError)

  const dispatch = useDispatch()

  async function handlePost() {
    if (message || postPicture) {
      const data = new FormData()
      data.append('posterId', userData._id)
      data.append('message', message)
      if (file) data.append('file', file)

      await dispatch(addPost(data))
      dispatch(getPosts())
      // reset after post saved in dd and id provided by mongo retreived
      cancelPost()
    } else {
      alert('Veuillez entrer un message')
    }
  }

  const handlePicture = (e) => {
    // display img we want to upload before saving in db
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const cancelPost = () => {
    setMessage('')
    setPostPicture('')
    setFile('')
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
  }, [userData, message])

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/profil" />
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Ecrivez votre message ici"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture ? (
              <li className="card-container">
                <div className="card-main">
                  <div className="card-header">
                    <div className="email">
                      <h3>{userData.email}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/picture.svg" alt="img" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm

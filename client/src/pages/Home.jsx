import React from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import Thread from '../components/Thread'
import NewPostForm from '../components/Post/NewPostForm'
import Log from '../components/Log'

function Home() {
  const uid = useContext(UidContext)

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
    </div>
  )
}

export default Home

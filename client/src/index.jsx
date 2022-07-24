import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { getUsers } from './actions/usersActions'
import { getPosts } from './actions/postActions'

// Store REDUX
const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUsers())
store.dispatch(getPosts())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

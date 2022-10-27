import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'

import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import Public from './Components/Public'
import Login from './features/auth/Login'

const router  = createBrowserRouter([
  {
    path:'/',
    element: <Public />
  
  },
  {
    path:'/login',
    element: <Login />
  
  }
 
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

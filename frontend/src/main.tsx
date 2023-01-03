import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Components/Sidebar'
import Login from './features/auth/Login'
// import LoginUI from './Components/LoginUI'
import SignUP from './Components/SignUP'
import { UpcomingCourses } from './Components/UpcomingCourses'

const router  = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
          {
            path: "UpcomingCourses",
            element: <UpcomingCourses />
          },
          
    ]
  
  },
  { 
    path:'/login',
    element: <Login />

  },
  {
    path:'/signup',
    element:<SignUP />
  },



 
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

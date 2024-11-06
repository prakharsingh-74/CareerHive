import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

const approuter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login', 
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={approuter}/>
    </>
  )
}

export default App

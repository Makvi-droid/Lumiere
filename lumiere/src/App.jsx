import { Routes, Route } from 'react-router-dom'
import Guest from './guest-landing-page/Guest'
import User from './user-landing-page/User'
import Products from './products-page/Products'
import Profile from './profile-page/Profile'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Guest/>}></Route>
        <Route path='/User' element={<User/>}></Route>
        <Route path='/Products' element={<Products/>}></Route>
        <Route path='/Profile' element={<Profile/>}></Route>
      </Routes>
    </>
  )
}

export default App

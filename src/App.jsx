import { useState, useEffect } from 'react'
// import './App.css'
import AppRouter from './router/AppRouter'
import { ToastContainer } from 'react-toastify'
import useUserStore from './stores/userStore'
import isTokenExpired from './utils/isTokenExpired'

function App() {
  const token = useUserStore(state => state.token)
  const logout = useUserStore(state => state.logout)
  useEffect(() => {
    if(isTokenExpired(token)) {
      logout()
    }
  },[])
  return (
    <div className='bg-[#FFFDF6]'>
      <AppRouter/>
      <ToastContainer
      position='top-right'
      />
    </div>
  )
}

export default App

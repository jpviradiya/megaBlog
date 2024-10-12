import { useState, useEffect } from 'react'
import { Header, Footer } from './components'
import { useDispatch } from 'react-redux'
import { authServices } from './appwrite';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';

function App() {
  // loading state
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  // if user is loggedin then redirect to somewhere, else login page
  useEffect(() => {
    authServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  // if data is fetched then render the app
  return !loading ?
    (<div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>)
    : null
}

export default App

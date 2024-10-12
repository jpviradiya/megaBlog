/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    // Check if the page requires authentication (protected route)
    if (authentication && authStatus !== authentication) {
      // If the user is not authenticated, redirect to the login page
      navigate("/login")
    }
    // Check if the page is public (no authentication required)
    else if (!authentication && authStatus !== authentication) {
      // If the user is logged in, redirect to the home page
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

// true && false != true = true(login)
// true && ture != true = false(/)

// false &&  true != true = false(/)
// false && false != true = false(/)

// useEffect(() => {
//   // If the authStatus doesn't match the required authentication, navigate accordingly
//   if (authStatus !== authentication) {
//       navigate(authentication ? "/login" : "/")
//   }
//   setLoading(false) // Hide loading after the check
// }, [authStatus, navigate, authentication])

// Protected Page (authentication = true)
// public Page (authentication = false)
//* authStatus	  authentication	  Condition_Met	    Action_Taken	      Redirect_Path
//  true	        true	            Matches	          Stay on the page	  No redirect
//  false	        true	            Does not match	  Redirect to login	  /login
//  false	        false	            Matches	          Stay on the page	  No redirect
//  true	        false	            Does not match	  Redirect to home	  /


//! TODO: most complex to understand logic
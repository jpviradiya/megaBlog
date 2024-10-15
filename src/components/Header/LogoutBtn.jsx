import { useDispatch } from 'react-redux'
import { authServices } from '../../appwrite';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    // returning promise and handle using dispatch and call logout method in redux
    authServices.logout() // '../../appwrite/auth'(appwrite)
      .then(() => {
        dispatch(logout()) // '../../store/authSlice'(redux)
      })
    navigate('/')
  }
  return (
    // TODO: use Button component
    /*
    <Button
      text="Logout"
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    />
    */
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutBtn
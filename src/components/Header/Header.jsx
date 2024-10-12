import { useSelector } from "react-redux"
import { Container, Logo, LogoutBtn } from "../index"
import { Link, useNavigate } from "react-router-dom"
const Header = () => {

  // check if user is login or not
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  
  // provides all path of the app to navigate
  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          {/* display logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          {/* display nav links base on user login */}
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ?
                (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.path)}
                      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                      {item.name}
                    </button>
                  </li>
                ) : null
            )}
            {/* if user loggedin then show logout button */}
            {authStatus && (<li><LogoutBtn /></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
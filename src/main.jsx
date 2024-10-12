import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { Protected } from "./components/index";
import { Home, Login, Signup, AddPost, AllPosts, EditPost, Post } from './pages/index.js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} /> {/* For the root path "/" */}
      <Route path="/login" element={<Protected authentication={false}><Login /></Protected>} />
      <Route path="/signup" element={<Protected authentication={false}><Signup /></Protected>} />
      <Route path="/all-posts" element={<Protected authentication><AllPosts /></Protected>} />
      <Route path="/add-post" element={<Protected authentication><AddPost /></Protected>} />
      <Route path="/edit-post/:slug" element={<Protected authentication><EditPost /></Protected>} />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* providing access to store of redux-toolkit */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

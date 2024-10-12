/* eslint-disable react/prop-types */
import { postServices } from '../../appwrite/index'
import { Link } from 'react-router-dom'

// $id is syntax in appwrite
function PostCard({ $id, title, featuredImage }) {

  return (
    // display in home page with image and title at below
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={postServices.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>

        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}
export default PostCard
import { postServices } from '../appwrite/index';
import { PostCard, Container } from '../components/index';
import { useEffect, useState } from 'react';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postServices.getPosts()
      .then((post) => {
        if (post) {
          setPosts(post.documents)
        }
      })
  }, [])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
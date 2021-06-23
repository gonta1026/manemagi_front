import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TPostState } from '../../modules/Post';
import { fetchPosts } from '../../services/Post';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { post, posts } = useSelector((state: { postState: TPostState }) => state.postState);

  console.log('stateは', post);
  console.log('stateは', posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {posts?.map((post, index) => (
        <p key={index}>{post.title}</p>
      ))}
    </>
  );
};

export default Home;

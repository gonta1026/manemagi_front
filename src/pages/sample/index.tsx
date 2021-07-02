import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TPostState } from '../../types/Post';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { fetchPosts } from '../../reducks/services/Post';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { post, posts } = useSelector((state: { postState: TPostState }) => state.postState);

  console.log('postのstateは', post);
  console.log('postsのstateは', posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <CommonWrapTemplate>
      <div>微修正</div>
      {posts?.map((post, index) => (
        <p key={index}>{post.title}</p>
      ))}
    </CommonWrapTemplate>
  );
};

export default Home;

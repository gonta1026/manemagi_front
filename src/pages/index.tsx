import React, { useEffect } from 'react';
import ApiClient from '../network/ApiClient';
import { BaseButton } from '../components/uiParts';

const Home: React.FC = () => {
  useEffect(() => {
    (async () => {
      const result = await ApiClient.getRequest('');
      console.log(result);
    })();
  });

  return (
    <>
      <div className="flex ml-10 mt-10">
        <BaseButton color="primary" variant="contained" onClick={() => console.log('click')}>
          ボタンです
        </BaseButton>
        <BaseButton color="secondary" variant="contained" onClick={() => console.log('click')}>
          secondary
        </BaseButton>
      </div>
    </>
  );
};

export default Home;

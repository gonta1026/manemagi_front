import React, { useEffect } from 'react';
import ApiClient from '../network/ApiClient';
import { BaseButton } from '../components/UiKit';

const Home: React.FC = () => {
  useEffect(() => {
    (async () => {
      const result = await ApiClient.getRequest('');
      console.log(result);
    })();
  });

  return (
    <>
      <BaseButton color="primary" variant="contained" onClick={() => console.log('click')}>
        ボタンです
      </BaseButton>
      <div className="mt-10">
        <BaseButton color="secondary" variant="contained" onClick={() => console.log('click')}>
          secondary
        </BaseButton>
      </div>
    </>
  );
};

export default Home;

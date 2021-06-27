import React, { useEffect } from 'react';
import ApiClient from '../network/ApiClient';
import { BaseButton } from '../components/uiParts';
import { BaseTextField } from '../components/uiParts';

const Home: React.FC = () => {
  useEffect(() => {
    (async () => {
      const result = await ApiClient.getRequest('');
      console.log(result);
    })();
  });

  return (
    <div>
      <header>ヘッダー</header>
      <section>メインビジュアル</section>
      <section>アプリの説明文</section>
      <BaseTextField />
      <BaseTextField />
      <BaseTextField />
      <BaseButton color="secondary" variant="contained" onClick={() => console.log('click')}>
        新規登録
      </BaseButton>
      <BaseButton color="secondary" variant="contained" onClick={() => console.log('click')}>
        ログイン
      </BaseButton>
      <p>もしログインをしていたら買い物一覧画面へリダイレクトさせる。</p>
    </div>
  );
};

export default Home;

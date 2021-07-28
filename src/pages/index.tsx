import React, { useEffect } from 'react';
import styled from 'styled-components';
/* components */
import TopPageTemplate from '../components/pages/index/template/TopPageTemplate';
import { BaseButton, BaseLink } from '../components/common/uiParts/atoms';
import { BaseContainer } from '../components/common/uiParts/layout';
/* const */
import { mediaSize } from '../const/media';
/* network */
import ApiClient from '../network/ApiClient';
/* pageMap */
import { page } from '../pageMap/';

const Home: React.FC = () => {
  useEffect(() => {
    (async () => {
      const result = await ApiClient.getRequest('');
      console.log(result);
    })();
  });

  return (
    <TopPageTemplate>
      <MainVisual>
        <h3 className={'title'}>
          買い物で立て替えた
          <br />
          お金を管理しよう
        </h3>
      </MainVisual>
      <BaseContainer>
        <div className="flex justify-center mt-5">
          <BaseLink pathname={page.signup.link()}>
            <BaseButton color="primary" variant="contained">
              使ってみる
            </BaseButton>
          </BaseLink>
        </div>
        <section className={'mt-5'}>
          <h3 className={'font-bold'}>アプリの特徴</h3>
          <ul>
            <li className={'list-disc'}>買い物で立て替えたお金を記録</li>
            <li className={'list-disc'}>
              買い物をしたあとの財布に溜まるレシートを残さなくても良い
            </li>
            <li className={'list-disc'}>買い物時、建て替え時の詳細に関する記録</li>
            <li className={'list-disc'}>
              {`${page.setting.edit.name()}をすることによりLINEメッセージで買い物や請求の詳細を通知`}
            </li>
          </ul>
        </section>

        <hr className="my-5 bg-black" />

        <section>
          <h3 className={'font-bold'}>使ってみる</h3>
          <ul>
            <li className={'list-disc'}>
              ライン通知を行う場合は
              <a
                className="text-blue-600"
                href="https://notify-bot.line.me/ja/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINE NOTIFY
              </a>
              でアクセストークンを取得し後に専用のLINEグループを作成する必要があります。こちらのトークンがなくてもアプリで記録を残すことは使用はできますが、ラインを使った通知ができません。。
            </li>
          </ul>
        </section>

        <hr className="my-5" />

        <div className="text-center">
          <BaseLink pathname={page.signup.link()}>
            <BaseButton color="primary" variant="contained">
              {page.signup.name()}
            </BaseButton>
          </BaseLink>

          <hr className="my-5" />
          <BaseLink pathname={page.login.link()}>
            <BaseButton color="primary" variant="contained">
              {page.login.name()}
            </BaseButton>
          </BaseLink>
        </div>
      </BaseContainer>
    </TopPageTemplate>
  );
};

const MainVisual = styled.div`
  background-color: green;
  text-align: center;
  height: 150px;
  position: relative;
  @media (min-width: ${mediaSize.MD}px) {
    height: 300px;
  }
  .title {
    color: #fff;
    width: 92%;
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Home;

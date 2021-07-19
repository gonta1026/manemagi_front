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
          買い物で使った <br />
          お金を管理しよう
        </h3>
      </MainVisual>
      <BaseContainer>
        <section className={'mt-5'}>
          <h3 className={'font-bold'}>日頃に感じる問題点</h3>
          <ul>
            <li className={'list-disc'}>妻から買い物を依頼されてお金を建て替えることが多い。。</li>
            <li className={'list-disc'}>
              クレジットカードを扱っていない店が多く現金を使うケースがとても多い。
            </li>
            <li className={'list-disc'}>
              場所によってはレシートも出してくれないところもあるのであとでお金を請求できていなくて損をしてしまうケースもある。
            </li>
            <li className={'list-disc'}>
              立て替えたお金を手元においておくとレシートが溜まってうんざり。
            </li>
          </ul>
        </section>

        <hr className="my-5 bg-black" />

        <section>
          <h3 className={'font-bold'}>上記の問題の解決</h3>
          <ul>
            <li className={'list-disc'}>
              ライングループを作ってアプリから買い物をした場所、金額を送ることができる。
            </li>
            <li className={'list-disc'}>立て替えたお金をお好きなタイミングで請求をできる。</li>
            <li className={'list-disc'}>買い物、請求の詳細の履歴を確認することができる。</li>
          </ul>
        </section>

        <section>
          <h3 className={'font-bold'}>注意事項</h3>
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

          <hr className="my-5" />
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
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Home;

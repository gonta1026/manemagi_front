import React, { useEffect } from 'react';
import styled from 'styled-components';
/* components */
import TopPageTemplate from '../components/pages/index/template/TopPageTemplate';
import { BaseButton, BaseLink, BaseCard } from '../components/common/uiParts/atoms';
import { BaseContainer } from '../components/common/uiParts/layout';
/* const */
import { mediaSize } from '../const/media';
import { COLORS } from '../const/color';
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
        <div className="left-bottom triangle" />
        <div className="right-bottom triangle" />
        <h3 className={'title font-bold'}>
          買い物で立て替えた
          <br />
          お金を管理しよう
        </h3>
      </MainVisual>
      <BaseContainer>
        {/* <div className="flex justify-center mt-5">
          <BaseLink pathname={page.signup.link()}>
            <BaseButton color="primary" variant="contained">
              使ってみる
            </BaseButton>
          </BaseLink>
        </div>
        <hr className="my-8 bg-black" /> */}

        <CardsSection className={'mt-8 space-y-2'}>
          {/* <BaseListItemText primary="Single-line item" /> */}
          <BaseCard className={'shadow-lg'}>
            <p className="p-3 font-bold">買い物で立て替えたお金を記録</p>
          </BaseCard>
          <BaseCard className={'shadow-lg'}>
            <p className="p-3 font-bold">
              買い物をしたあとの財布に溜まるレシートを残さなくても良い
            </p>
          </BaseCard>
          <BaseCard className={'shadow-lg'}>
            <p className="p-3 font-bold">買い物時、建て替え時の詳細に関する記録</p>
          </BaseCard>
          <BaseCard className={'shadow-lg'}>
            <p className="p-3 font-bold">{`${page.setting.edit.name()}をすることによりLINEメッセージで買い物や請求の詳細を通知`}</p>
          </BaseCard>
        </CardsSection>

        {/* <hr className="my-8 bg-black" /> */}

        {/* <section>
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
        </section> */}

        {/* <hr className="my-5" /> */}

        <div className="mt-10 text-center">
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
  text-align: center;
  height: 150px;
  position: relative;
  @media (min-width: ${mediaSize.MD}px) {
    height: 300px;
  }
  .title {
    width: 92%;
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .triangle {
    position: absolute;
    bottom: 0;
  }
  .left-bottom {
    /*1色パターン：border-leftだけに色指定*/
    border-top: 40px solid transparent;
    border-left: 90px solid ${COLORS.TEXT_GREEN};
    left: 0;
    @media (min-width: ${mediaSize.MD}px) {
      border-top: 60px solid transparent;
      border-left: 150px solid ${COLORS.TEXT_GREEN};
    }
  }
  .right-bottom {
    /*1色パターン：border-leftだけに色指定*/
    border-top: 40px solid transparent;
    border-right: 90px solid ${COLORS.TEXT_GREEN};
    right: 0;
    @media (min-width: ${mediaSize.MD}px) {
      border-top: 60px solid transparent;
      border-right: 150px solid ${COLORS.TEXT_GREEN};
    }
  }
`;

const CardsSection = styled.section``;

export default Home;

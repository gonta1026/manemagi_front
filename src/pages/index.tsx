import React from 'react';
import styled from 'styled-components';
/* components */
import TopPageTemplate from '../components/pages/index/template/TopPageTemplate';
import { BaseButton, BaseLink, BaseCard } from '../components/common/uiParts/atoms';
import { BaseContainer } from '../components/common/uiParts/layout';
/* const */
import { mediaSize } from '../const/media';
import { COLORS } from '../const/color';
/* pageMap */
import { page } from '../pageMap/';

const Home: React.FC = () => {
  return (
    <TopPageTemplate>
      <MainVisual>
        <div className="left-bottom triangle" />
        <div className="right-bottom triangle" />
        <h3 className={'title font-bold'}>
          買い物で立て替えた
          <br />
          お金を管理
        </h3>
      </MainVisual>
      <BaseContainer>
        <div className={'mt-8 space-y-3'}>
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
        </div>

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
            <BaseButton>{page.signup.name()}</BaseButton>
          </BaseLink>

          <hr className="my-5" />
          <BaseLink pathname={page.login.link()}>
            <BaseButton>{page.login.name()}</BaseButton>
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
  /* border-bottom: 5px solid ${COLORS.TEXT_GREEN}; */
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
    bottom: -1px;
  }
  .left-bottom {
    /*1色パターン：border-leftだけに色指定*/
    border-top: 30px solid transparent;
    border-left: 60vw solid ${COLORS.TEXT_GREEN};
    left: 0;
    @media (min-width: ${mediaSize.MD}px) {
      border-top: 60px solid transparent;
      /* border-left: 150vw solid ${COLORS.TEXT_GREEN}; */
    }
  }
  .right-bottom {
    /*1色パターン：border-leftだけに色指定*/
    border-top: 30px solid transparent;
    border-right: 60vw solid ${COLORS.TEXT_GREEN};
    right: 0;
    @media (min-width: ${mediaSize.MD}px) {
      border-top: 60px solid transparent;
      /* border-right: 150vw solid ${COLORS.TEXT_GREEN}; */
    }
  }
`;

export default Home;

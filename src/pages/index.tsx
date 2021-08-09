import React from 'react';
import styled from 'styled-components';
/* components */
import TopPageTemplate from '../components/pages/index/template/TopPageTemplate';
import { BaseCard } from '../components/common/uiParts/atoms';
import { BaseLinkButton } from '../components/common/molecules';
import { BaseContainer } from '../components/common/uiParts/layout';
/* const */
import { mediaSize } from '../styles/js';
import { COLORS } from '../const/color';
/* pageMap */
import { page } from '../pageMap/';
/* modules */
import Auth from '../modules/Auth';
/* modules */
import useIsAfterSsr from '../customHook/useIsAfterSsr';

const Home: React.FC = () => {
  const isAfterSsr = useIsAfterSsr();
  const auth = new Auth();

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

        <div className="mt-10 text-center">
          {isAfterSsr && auth.loginedStorageExists() ? (
            <BaseLinkButton pathname={page.top.link()} size={'large'} variant={'contained'}>
              {page.top.name()}
            </BaseLinkButton>
          ) : (
            <>
              <BaseLinkButton pathname={page.signup.link()} size={'large'} variant={'contained'}>
                {page.signup.name()}
              </BaseLinkButton>
              <hr className="my-5" />
              <BaseLinkButton pathname={page.login.link()} size={'large'} variant={'contained'}>
                {page.login.name()}
              </BaseLinkButton>
            </>
          )}
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
    bottom: -1px;
  }
  .left-bottom {
    border-top: 30px solid transparent;
    border-left: 60vw solid ${COLORS.TEXT_GREEN};
    left: 0;
    @media (min-width: ${mediaSize.MD}px) {
      border-top: 60px solid transparent;
      /* border-left: 150vw solid ${COLORS.TEXT_GREEN}; */
    }
  }
  .right-bottom {
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

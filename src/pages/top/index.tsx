import React, { useEffect } from 'react';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BaseLink } from '../../components/common/uiParts/atoms';
/* pageMap */
import { drawerLinks } from '../../pageMap';
/* pageMap */
import LocalStorage from '../../utils/LocalStorage';
/* customHook */
import useToastAction from '../../customHook/useToastAction';

const Top = (): JSX.Element => {
  const toastActions = useToastAction();

  useEffect(() => {
    const storage = new LocalStorage();
    const targetNotice = storage.getItem('pageMoveNotice')!;
    const { loginedNotice, signUpedNotice, shoppingedNotice, claimedNotice } =
      LocalStorage.noticeKey;

    let message = '';
    switch (targetNotice) {
      case loginedNotice:
        message = 'ログインしました！';
        break;
      case signUpedNotice:
        message = '新規登録してログインしました！';
        break;
      case shoppingedNotice:
        message = '買い物登録しました！';
        break;
      case claimedNotice:
        message = '請求登録をしました！';
        break;
    }
    storage.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  }, []);
  return (
    <CommonWrapTemplate toastActions={toastActions}>
      <section className={'mt-10'}>
        <p>トップページを作ってここをルートのページにしようと考えているが内容が決まっていない。</p>
        <p>買い物登録画面をにしてもいいかもしれない。。</p>
        <p>フッターバーがあるなら独自のトップページはいらないかも？</p>
        <ul className={'mt-5 space-y-2'}>
          {drawerLinks.map((page, index) => {
            return (
              <li key={index}>
                <BaseLink pathname={page.link}>{page.name}</BaseLink>
              </li>
            );
          })}
        </ul>
      </section>
    </CommonWrapTemplate>
  );
};

export default Top;

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
    const pageMoveNotice = 'pageMoveNotice'; // TODO 共通の場所におく？
    const storage = new LocalStorage();
    const targetNotice = storage.getItem('pageMoveNotice')!;
    const { loginedNotice, signUpedNotice, shoppingedNotice } = LocalStorage.noticeKey;
    let messege = '';
    switch (targetNotice) {
      case loginedNotice:
        messege = 'ログインしました！';
        break;
      case signUpedNotice:
        messege = '新規登録してログインしました！';
        break;
      case shoppingedNotice:
        messege = '買い物登録しました！';
        break;
    }
    storage.afterPageMoveNotice(pageMoveNotice, () =>
      toastActions.handleToastOpen({
        message: messege,
      }),
    );
  }, []);
  return (
    <CommonWrapTemplate toastActions={toastActions}>
      <section className={'mt-10'}>
        <p>トップページを作ってここをルートのページにしようと考えているが内容が決まっていない。</p>
        <ul>
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

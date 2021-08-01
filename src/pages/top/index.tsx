import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
import { BasePageTitle } from '../../components/common/uiParts/atoms';
import { LineNotice } from '../../components/pages/common';
import { CardWrapper } from '../../components/common/organisms';
/* pageMap */
import LocalStorage from '../../utils/LocalStorage';
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings } from '../../reducks/services/Shopping';
/* types */
import { TShopping } from '../../types/Shopping';
/* utils */
import { formatPriceYen, ommisionText } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';

const Top = (): JSX.Element => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchShoppingsAndSetShops();
  }, []);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      const noClaimShoppings = shoppings.filter((shopping) => shopping.claimId === null);
      setShopping(noClaimShoppings);
    }
  };

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

  const totalClaimPrice = (() => {
    return shoppings.reduce((accumulator, shopping) => {
      return shopping.price! + accumulator;
    }, 0);
  })();

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <BasePageTitle className={'my-5'}>未請求一覧</BasePageTitle>
      <p className={'mt-3'}>未請求金額：{formatPriceYen(totalClaimPrice)}</p>

      <div className="mt-1 space-y-3">
        {shoppings.map((shopping, index) => (
          <CardWrapper
            className={'border-t-2 p-3 relative'}
            detailPathName={page.shopping.show.link(shopping.id!.toString())}
            editPathName={page.shopping.edit.link(shopping.id!.toString())}
            isEditShow={shopping.claimId === null}
            isDeleteShow={shopping.claimId === null}
            key={index}
          >
            <div className="flex justify-between">
              <div className="left">
                <div>買い物日：{formatDay(shopping.date!)}</div>
                <div>金額：{formatPriceYen(shopping.price)}</div>
                <div>
                  説明：{shopping.description ? ommisionText(shopping.description, 20) : 'なし'}
                </div>
              </div>
              <div className="right">
                <LineNotice isLineNotice={shopping.isLineNotice} />
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>
    </CommonWrapTemplate>
  );
};

export default Top;

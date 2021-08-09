import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { ConfirmModal } from '../../components/common/uiParts';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
// import { BasePageTitle } from '../../components/common/uiParts/atoms';
import { LineNotice } from '../../components/pages/common';
import { ShoppingCardWrapper, ClaimCardWrapper } from '../../components/pages/common';
/* pageMap */
import LocalStorage, { noticeStorageValues, storageKeys } from '../../modules/LocalStorage';
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings, deleteShopping } from '../../reducks/services/Shopping';
import { fetchClaims } from '../../reducks/services/Claim';
import { fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShopping } from '../../types/Shopping';
import { TClaim } from '../../types/Claim';
import { TShop } from '../../types/Shop';
/* utils */
import { formatPriceYen, ommisionText, totalSumPrice } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
/* const */
import { LABEL_SHOPPING } from '../../const/form/shopping';

const Top = (): JSX.Element => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const [shops, setShops] = useState<TShop[]>([]);
  const [claims, setClaims] = useState<TClaim[]>([]);
  const [modalShopping, setModalShopping] = useState<TShopping>();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchShoppingsAndSetShops();
    fetchShopsAndSetShops();
    fetchClaimsAndSetClaims();

    const storage = new LocalStorage();
    const targetNotice = storage.getStorageItem(storageKeys.pageMoveNotice)!;
    const { loginedNotice, signUpedNotice, shoppingedNotice, claimedNotice, createdShopNotice } =
      noticeStorageValues;
    let message = '';
    switch (targetNotice) {
      case loginedNotice:
        message = 'ログインをしました！';
        break;
      case signUpedNotice:
        message = '新規登録をしてログインしました！';
        break;
      case shoppingedNotice:
        message = '買い物を登録しました！';
        break;
      case claimedNotice:
        message = '請求を登録しました！';
        break;
      case createdShopNotice:
        message = 'お店を登録しました！';
        break;
    }
    // 実機で確認をすると2重で絵画をするように見えるので対処
    storage.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  }, []);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      const noClaimShoppings = shoppings.filter((shopping) => shopping.claimId === null);
      setShopping(noClaimShoppings);
    }
  };

  const fetchClaimsAndSetClaims = async () => {
    const response: any = await dispatch(fetchClaims());
    if (response.payload.status === 'success') {
      const claims: TClaim[] = response.payload.data;
      setClaims(claims);
    }
  };

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    if (response.payload.status === 'success') {
      const shops: TShop[] = response.payload.data.shops;
      setShops(shops);
    }
  };

  const deleteShoppingAndSetShopping = async () => {
    if (modalShopping?.id) {
      const shoppingId = String(modalShopping.id);
      const response: any = await dispatch(deleteShopping(shoppingId));
      const { handleToastOpen } = toastActions;
      if (response.payload.status === 'success') {
        fetchShoppingsAndSetShops();
        setOpen(false);

        handleToastOpen({
          message: `買い物を削除しました。`,
          severity: 'success',
        });
      } else {
        handleToastOpen({
          message: `削除に失敗しました。`,
          severity: 'error',
        });
      }
    }
  };

  const toastActions = useToastAction();

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => deleteShoppingAndSetShopping()}
        modaltitle="削除"
      >
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.PRICE}</dt>
          <dd>{modalShopping?.price ? formatPriceYen(modalShopping.price) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.DATE}</dt>
          <dd>{modalShopping?.date ? formatDay(modalShopping.date) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.SHOP_ID}</dt>
          <dd>
            {modalShopping?.shopId ? shops.find(({ id }) => id === modalShopping.shopId)?.name : ''}
          </dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.DESCRIPTION}</dt>
          <dd>{modalShopping?.description ? modalShopping.description : 'なし'}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.IS_LINE_NOTICE}</dt>
          <dd>{modalShopping?.isLineNotice ? '通知する' : '通知しない'}</dd>
        </dl>
      </ConfirmModal>
      {/* <BasePageTitle className={'my-5'}>トップ画面（タイトル検討中）</BasePageTitle> */}
      <h3 className={'font-bold text-2xl mt-10'}>未請求買い物一覧</h3>
      <p className={'mt-3'}>
        未請求金額：{formatPriceYen ? formatPriceYen(totalSumPrice(shoppings, 'price')) : ''}
      </p>

      <div className="mt-1 space-y-3">
        {shoppings.map((shopping, index) => (
          <ShoppingCardWrapper
            className={'border-t-2 p-3 relative'}
            detailPathName={page.shopping.show.link(shopping.id!.toString())}
            editPathName={page.shopping.edit.link(shopping.id!.toString())}
            isEditShow={shopping.claimId === null}
            isDeleteShow={shopping.claimId === null}
            onClick={() => {
              setModalShopping(shopping);
              setOpen(true);
            }}
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
          </ShoppingCardWrapper>
        ))}
      </div>

      <hr className={'my-5'} />

      <h3 className={'font-bold text-2xl'}>未受領請求一覧</h3>
      <p className={'mt-3'}>
        未受領請求合計金額：
        {formatPriceYen ? formatPriceYen(totalSumPrice(claims, 'totalPrice')) : ''}
      </p>

      <div className="mt-1 space-y-3">
        {claims.map(
          (claim, index) =>
            !claim.isGetClaim && (
              <ClaimCardWrapper
                className={'border-t-2 p-3 relative'}
                detailPathName={page.claim.show.link(claim.id!.toString())}
                isDeleteShow={false}
                ReceiptOnClick={() => console.log('click!')}
                deleteOnClick={() => console.log('click!')}
                key={index}
              >
                <div className="flex justify-between">
                  <div className="left">
                    <div>請求日：{formatDay(claim.createdAt)}</div>
                    <div>金額：{formatPriceYen(claim.totalPrice)}</div>
                  </div>
                  <div className="right">
                    <LineNotice isLineNotice={claim.isLineNotice} />
                  </div>
                </div>
              </ClaimCardWrapper>
            ),
        )}
      </div>
    </CommonWrapTemplate>
  );
};

export default Top;

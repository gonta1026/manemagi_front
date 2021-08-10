import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { LabelAndSwitch } from '../../components/common/molecules';
import { ConfirmModal } from '../../components/common/uiParts';
import { LineNotice, IsUseLineHelper } from '../../components/pages/common';

/* customHook */
import useToastAction from '../../customHook/useToastAction';
import { ShoppingCardWrapper, ClaimCardWrapper } from '../../components/pages/common';
/* pageMap */
import LocalStorage, { noticeStorageValues, storageKeys } from '../../modules/LocalStorage';
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings, deleteShopping } from '../../reducks/services/Shopping';
import { fetchClaims, updateClaim } from '../../reducks/services/Claim';
import { fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShopping } from '../../types/Shopping';
import { TClaim } from '../../types/Claim';
import { TShop } from '../../types/Shop';
/* types */
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatPriceYen, ommisionText, totalSumPrice } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
/* const */
import { SHOPPING_FORM } from '../../const/form/shopping';
import { LABEL_CLAIM } from '../../const/form/claim';

const Top = (): JSX.Element => {
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const [shops, setShops] = useState<TShop[]>([]);
  const [claims, setClaims] = useState<TClaim[]>([]);
  const [modalShopping, setModalShopping] = useState<TShopping>();
  const [modalClaim, setModalClaim] = useState<TClaim>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
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

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

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

  const claimUpdateAndSetClaims = async () => {
    if (modalClaim?.id) {
      const claimId = String(modalClaim.id);
      const response: any = await dispatch(
        updateClaim({
          id: claimId,
          data: { isLineNotice, isReceipt: true },
        }),
      );

      const { handleToastOpen } = toastActions;
      if (response.payload.status === 'success') {
        fetchClaimsAndSetClaims();
        setReceiptModalOpen(false);
        handleToastOpen({
          message: `請求受領を登録しました。`,
          severity: 'success',
        });
      } else {
        handleToastOpen({
          message: `請求受領の登録に失敗しました。`,
          severity: 'error',
        });
      }
    }
  };

  const deleteShoppingAndSetShopping = async () => {
    if (modalShopping?.id) {
      const shoppingId = String(modalShopping.id);
      const response: any = await dispatch(
        deleteShopping({
          id: shoppingId,
          data: { isLineNotice: isLineNotice },
        }),
      );

      const { handleToastOpen } = toastActions;
      if (response.payload.status === 'success') {
        fetchShoppingsAndSetShops();
        setDeleteModalOpen(false);

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
        focus
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={() => deleteShoppingAndSetShopping()}
        modaltitle="削除"
      >
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.PRICE.LABEL}</dt>
          <dd>{modalShopping?.price ? formatPriceYen(modalShopping.price) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.DATE.LABEL}</dt>
          <dd>{modalShopping?.date ? formatDay(modalShopping.date) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.SHOP_ID.LABEL}</dt>
          <dd>
            {modalShopping?.shopId ? shops.find(({ id }) => id === modalShopping.shopId)?.name : ''}
          </dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.DESCRIPTION.LABEL}</dt>
          <dd>{modalShopping?.description ? modalShopping.description : 'なし'}</dd>
        </dl>
        <dl className={'list'}>
          <dt>買い物の{SHOPPING_FORM.IS_LINE_NOTICE.LABEL}</dt>
          <dd>{modalShopping?.isLineNotice ? '通知済' : '未通知'}</dd>
        </dl>
        {/* LINE通知(isLineNotice) */}
        <LabelAndSwitch
          className={'mt-2'}
          checked={isLineNotice}
          disabled={!settingState.user?.setting.isUseLine}
          helperText={!settingState.user?.setting.isUseLine && <IsUseLineHelper />}
          onChange={() => setIsLineNotice(!isLineNotice)}
          id={SHOPPING_FORM.IS_LINE_NOTICE.ID}
          label={`${SHOPPING_FORM.IS_LINE_NOTICE.LABEL}${isLineNotice ? 'ON' : 'OFF'}`}
        />
      </ConfirmModal>

      {/* 請求受領確認 */}
      <ConfirmModal
        focus
        open={receiptModalOpen}
        handleClose={() => setReceiptModalOpen(false)}
        handleOk={() => claimUpdateAndSetClaims()}
        modaltitle="請求受領"
      >
        <dl className={'list'}>
          <dt>{LABEL_CLAIM.TOTAL_PRICE}</dt>
          <dd>{modalClaim?.totalPrice ? formatPriceYen(modalClaim.totalPrice) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_CLAIM.CREATED_AT}</dt>
          <dd>{modalClaim?.createdAt ? formatDay(modalClaim.createdAt) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>請求の{LABEL_CLAIM.IS_LINE_NOTICE}</dt>
          <dd>{modalClaim?.isLineNotice ? '通知済' : '未通知'}</dd>
        </dl>
        {/* LINE通知(isLineNotice) */}
        <LabelAndSwitch
          className={'mt-2'}
          checked={isLineNotice}
          disabled={!settingState.user?.setting.isUseLine}
          helperText={!settingState.user?.setting.isUseLine && <IsUseLineHelper />}
          onChange={() => setIsLineNotice(!isLineNotice)}
          id={SHOPPING_FORM.IS_LINE_NOTICE.ID}
          label={`${SHOPPING_FORM.IS_LINE_NOTICE.LABEL}${isLineNotice ? 'ON' : 'OFF'}`}
        />
      </ConfirmModal>

      <h3 className={'font-bold text-2xl mt-10'}>未請求買い物一覧</h3>
      {shoppings.length ? (
        <>
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
                  setDeleteModalOpen(true);
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
        </>
      ) : (
        <p className={'mt-3'}>未請求の買い物登録はありません。</p>
      )}

      <hr className={'my-5'} />

      <h3 className={'font-bold text-2xl'}>未受領請求一覧</h3>

      {claims.filter((claim) => !claim.isReceipt).length ? (
        <>
          <p className={'mt-3'}>
            未受領請求合計金額：
            {formatPriceYen ? formatPriceYen(totalSumPrice(claims, 'totalPrice')) : ''}
          </p>
          <div className="mt-1 space-y-3">
            {claims.map(
              (claim, index) =>
                !claim.isReceipt && (
                  <ClaimCardWrapper
                    className={'border-t-2 p-3 relative'}
                    detailPathName={page.claim.show.link(claim.id!.toString())}
                    ReceiptOnClick={() => {
                      setModalClaim(claim);
                      setReceiptModalOpen(true);
                    }}
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
        </>
      ) : (
        <p className={'mt-3'}>未受領の請求登録はありません。</p>
      )}
    </CommonWrapTemplate>
  );
};

export default Top;

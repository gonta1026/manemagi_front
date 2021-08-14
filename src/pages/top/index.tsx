import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { LineNotice } from '../../components/common/uiParts';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
import { useShop, useShopping, useClaim } from '../../customHook';
import {
  ShoppingCardWrapper,
  ClaimCardWrapper,
  ConfirmDeleteShoppingModal,
  ConfirmDeleteClaimModal,
  ConfirmReceiptClaimModal,
} from '../../components/pages/common';
/* modules */
import LocalStorage, { noticeStorageValues, storageKeys } from '../../modules/LocalStorage';
/* pageMap */
import { page } from '../../pageMap';
/* types */
import { TShopping, initialShopping } from '../../types/Shopping';
import { initialClaim, TClaim } from '../../types/Claim';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatPriceYen, ommisionText, totalSumPrice } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
import { storageKeys } from '../../modules/LocalStorage';
import Notice from '../../modules/Notice';

const Top = (): JSX.Element => {
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [modalShopping, setModalShopping] = useState<TShopping>(initialShopping);
  const [modalClaim, setModalClaim] = useState<TClaim>(initialClaim);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [claimModalOpen, setClaimModalOpen] = useState<boolean>(false);
  const [deleteClaimModalOpen, setDeleteClaimModalOpen] = useState<boolean>(false);
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const { shoppings, fetchNoClaimShoppingsAndSet, deleteShoppingAndSet } = useShopping();
  const { claims, fetchClaimsAndSet, updateClaimAndSet, deleteClaimAndSet } = useClaim();
  const { shops, fetchShopsAndSet } = useShop();
  const toastActions = useToastAction();

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

  useEffect(() => {
    fetchNoClaimShoppingsAndSet();
    fetchShopsAndSet();
    fetchClaimsAndSet();
    pageMoveNotice();
  }, []);

  const pageMoveNotice = () => {
    const notice = new Notice();
    const targetNotice = notice.getStorageItem(storageKeys.pageMoveNotice)!;
    const message = notice.getNoticeMessage(targetNotice);
    notice.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  };

  const noReceiptClaims = () => claims.filter((claim) => !claim.isReceipt);

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={async () => {
          await deleteShoppingAndSet(modalShopping, isLineNotice, toastActions);
          setDeleteModalOpen(false);
        }}
        isLineNotice={isLineNotice}
        modalShopping={modalShopping}
        modaltitle={'削除'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        shops={shops}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

      <ConfirmReceiptClaimModal
        open={claimModalOpen}
        handleClose={() => setClaimModalOpen(false)}
        handleOk={async () => {
          await updateClaimAndSet(modalClaim, isLineNotice, toastActions);
          setClaimModalOpen(false);
        }}
        isLineNotice={isLineNotice}
        modalClaim={modalClaim}
        modaltitle={'請求受領'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

      <ConfirmDeleteClaimModal
        open={deleteClaimModalOpen}
        handleClose={() => setDeleteClaimModalOpen(false)}
        handleOk={async () => {
          await deleteClaimAndSet(modalClaim, isLineNotice, toastActions);
          await fetchNoClaimShoppingsAndSet();
          setDeleteClaimModalOpen(false);
        }}
        isLineNotice={isLineNotice}
        modalClaim={modalClaim}
        modaltitle={'請求削除'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

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
                    <LineNotice
                      isLineNotice={shopping.isLineNoticed}
                      text={shopping.isLineNoticed ? '買い物通知済' : '買い物未通知'}
                    />
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

      {noReceiptClaims().length ? (
        <>
          <p className={'mt-3'}>
            未受領請求合計金額：
            {formatPriceYen ? formatPriceYen(totalSumPrice(noReceiptClaims(), 'totalPrice')) : ''}
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
                      setClaimModalOpen(true);
                    }}
                    deleteOnClick={() => {
                      setModalClaim(claim);
                      setDeleteClaimModalOpen(true);
                    }}
                    key={index}
                  >
                    <div className="flex justify-between">
                      <div className="left">
                        <div>請求日：{formatDay(claim.createdAt)}</div>
                        <div>金額：{formatPriceYen(claim.totalPrice)}</div>
                      </div>
                      <div className="right">
                        <LineNotice
                          isLineNotice={claim.isLineNoticed}
                          text={claim.isLineNoticed ? '請求通知済' : '請求未通知'}
                        />
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

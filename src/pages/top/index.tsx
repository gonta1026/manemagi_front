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
import Notice from '../../modules/Notice';
/* pageMap */
import { page } from '../../pageMap';
/* types */
import { initialShopping, TShoppingNullable } from '../../model/shopping';
import { initialClaim, TClaimNullable } from '../../model/claim';
import { settingAndUser } from '../../model/setting';
/* utils */
import { formatPriceYen, ommisionText, totalSumPrice } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';

const Top = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [modalShopping, setModalShopping] = useState<TShoppingNullable>(initialShopping);
  const [modalClaim, setModalClaim] = useState<TClaimNullable>(initialClaim);
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
    Notice.pageMovedNotice(toastActions);
    fetchNoClaimShoppingsAndSet();
    fetchShopsAndSet();
    fetchClaimsAndSet();
  }, []);

  const noReceiptClaims = () => claims.filter((claim) => !claim.isReceipt);

  return (
    <CommonWrapTemplate {...{ isLoading, toastActions }}>
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          await deleteShoppingAndSet(modalShopping, isLineNotice, toastActions);
          setDeleteModalOpen(false);
          setIsLoading(false);
        }}
        isLineNotice={isLineNotice}
        modalShopping={modalShopping}
        modaltitle={'??????'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        shops={shops}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

      <ConfirmReceiptClaimModal
        open={claimModalOpen}
        handleClose={() => setClaimModalOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          await updateClaimAndSet(modalClaim, isLineNotice, toastActions);
          setClaimModalOpen(false);
          setIsLoading(false);
        }}
        isLineNotice={isLineNotice}
        modalClaim={modalClaim}
        modaltitle={'????????????'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

      <ConfirmDeleteClaimModal
        open={deleteClaimModalOpen}
        handleClose={() => setDeleteClaimModalOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          await deleteClaimAndSet(modalClaim, isLineNotice, toastActions);
          await fetchNoClaimShoppingsAndSet();
          setDeleteClaimModalOpen(false);
          setIsLoading(false);
        }}
        isLineNotice={isLineNotice}
        modalClaim={modalClaim}
        modaltitle={'????????????'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

      <h3 className={'font-bold text-2xl mt-10'}>????????????????????????</h3>
      {shoppings.length ? (
        <>
          <p className={'mt-3'}>
            ??????????????????{formatPriceYen ? formatPriceYen(totalSumPrice(shoppings, 'price')) : ''}
          </p>
          <div className="mt-1 space-y-3">
            {shoppings.map((shopping, index) => (
              <ShoppingCardWrapper
                className={'border-t-2 p-3 relative'}
                detailPathName={page.shopping.show.link(shopping.id!.toString())}
                editPathName={page.shopping.edit.link(shopping.id!.toString())}
                isEditShow={false}
                isDeleteShow={shopping.claimId === null}
                onClick={() => {
                  setModalShopping(shopping);
                  setDeleteModalOpen(true);
                }}
                key={index}
              >
                <div className="flex justify-between">
                  <div className="left">
                    <div>???????????????{formatDay(shopping.date!)}</div>
                    <div>?????????{formatPriceYen(shopping.price)}</div>
                    <div>
                      ?????????{shopping.description ? ommisionText(shopping.description, 20) : '??????'}
                    </div>
                  </div>
                  <div className="right">
                    <LineNotice
                      isLineNotice={shopping.isLineNoticed}
                      text={shopping.isLineNoticed ? '??????????????????' : '??????????????????'}
                    />
                  </div>
                </div>
              </ShoppingCardWrapper>
            ))}
          </div>
        </>
      ) : (
        <p className={'mt-3'}>????????????????????????????????????????????????</p>
      )}

      <hr className={'my-5'} />

      <h3 className={'font-bold text-2xl'}>?????????????????????</h3>

      {noReceiptClaims().length ? (
        <>
          <p className={'mt-3'}>
            ??????????????????????????????
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
                        <div>????????????{formatDay(claim.createdAt)}</div>
                        <div>?????????{formatPriceYen(claim.totalPrice)}</div>
                      </div>
                      <div className="right">
                        <LineNotice
                          isLineNotice={claim.isLineNoticed}
                          text={claim.isLineNoticed ? '???????????????' : '???????????????'}
                        />
                      </div>
                    </div>
                  </ClaimCardWrapper>
                ),
            )}
          </div>
        </>
      ) : (
        <p className={'mt-3'}>?????????????????????????????????????????????</p>
      )}
    </CommonWrapTemplate>
  );
};

export default Top;

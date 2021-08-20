import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle, LineNotice, BaseLinkButton } from '../../components/common/uiParts';
import { ConfirmReceiptClaimModal, ConfirmDeleteClaimModal } from '../../components/pages/common';
/* customHook */
import { useClaim, useToastAction } from '../../customHook';
/* pageMap */
import { page } from '../../pageMap';
/* types */
import { TClaim, initialClaim } from '../../types/Claim';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatPriceYen, totalSumPrice } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
import { ClaimCardWrapper } from '../../components/pages/common';
/* modules */
import Notice from '../../modules/Notice';

const Claim = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [modalClaim, setModalClaim] = useState<TClaim>(initialClaim);
  const [claimModalOpen, setClaimModalOpen] = useState<boolean>(false);
  const [deleteClaimModalOpen, setDeleteClaimModalOpen] = useState<boolean>(false);

  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const { claims, fetchClaimsAndSet, updateClaimAndSet, deleteClaimAndSet } = useClaim();
  const toastActions = useToastAction();

  useEffect(() => {
    Notice.pageMovedNotice(toastActions);
    fetchClaimsAndSet();
  }, []);

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

  return (
    <CommonWrapTemplate {...{ isLoading, toastActions }}>
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
        modaltitle={'請求受領'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

      <ConfirmDeleteClaimModal
        open={deleteClaimModalOpen}
        handleClose={() => setDeleteClaimModalOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          await deleteClaimAndSet(modalClaim, isLineNotice, toastActions);
          setDeleteClaimModalOpen(false);
          setIsLoading(false);
        }}
        isLineNotice={isLineNotice}
        modalClaim={modalClaim}
        modaltitle={'請求削除'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />
      <BasePageTitle className={'my-5'}>{page.claim.list.name()}</BasePageTitle>

      {claims.length ? (
        <>
          <p className={'mt-10'}>
            未受領請求合計金額：
            {formatPriceYen ? formatPriceYen(totalSumPrice(claims, 'totalPrice')) : ''}
          </p>
          <div className="mt-1 space-y-3">
            {claims.map((claim, index) => (
              <ClaimCardWrapper
                className={'border-t-2 p-3 relative'}
                detailPathName={page.claim.show.link(claim.id!.toString())}
                isReceiptShow={!claim.isReceipt}
                isDeleteShow={!claim.isReceipt}
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
            ))}
          </div>
        </>
      ) : (
        <p className={'mt-10'}>未受領の請求登録はありません。</p>
      )}

      <div className="mt-10 text-center">
        <BaseLinkButton pathname={page.top.link()} customType={'arrowBack'}>
          {page.top.name()}へ戻る
        </BaseLinkButton>
      </div>
    </CommonWrapTemplate>
  );
};

export default Claim;

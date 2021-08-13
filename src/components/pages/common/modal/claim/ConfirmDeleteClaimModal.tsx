import React from 'react';
/* components */
import { ConfirmModal, IsUseLineHelper } from '../../../../common/uiParts';
import { LabelAndSwitch } from '../../../../common/molecules';
import { TModalTitle } from '../../../../common/uiParts/modal/ConfirmModal';
/* const */
import { CLAIM_FORM, LABEL_CLAIM } from '../../../../../const/form/claim';
/* types */
import { TClaim } from '../../../../../types/Claim';
/* utils */
import { formatPriceYen } from '../../../../../utils/function';
import { formatDay } from '../../../../../utils/FormatDate';

const ConfirmDeleteClaimModal = ({
  focus,
  handleClose,
  handleOk,
  isLineNotice,
  isUseLineAtSetting,
  modaltitle,
  modalClaim,
  open,
  onChangeLineNotice,
}: {
  focus?: boolean;
  handleClose: any;
  handleOk: any;
  isLineNotice: boolean;
  isUseLineAtSetting: boolean;
  modaltitle: TModalTitle;
  modalClaim: TClaim | undefined;
  open: boolean;
  onChangeLineNotice: any;
}): JSX.Element => {
  return (
    <ConfirmModal {...{ focus, open, handleClose, handleOk, modaltitle }}>
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
        disabled={!isUseLineAtSetting}
        helperText={!isUseLineAtSetting && <IsUseLineHelper />}
        onChange={onChangeLineNotice}
        id={CLAIM_FORM.IS_LINE_NOTICE.ID}
        label={`${CLAIM_FORM.IS_LINE_NOTICE.LABEL}${isLineNotice ? 'ON' : 'OFF'}`}
      />
    </ConfirmModal>
  );
};

export default ConfirmDeleteClaimModal;

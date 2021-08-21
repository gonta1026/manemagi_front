import React from 'react';
/* components */
import { ConfirmModal, IsUseLineHelper } from '../../../../common/uiParts';
import { LabelAndSwitch } from '../../../../common/uiParts';
import { TModalTitle } from '../../../../common/uiParts/modal/ConfirmModal';
/* const */
import { SHOPPING_FORM } from '../../../../../const/form/shopping';
/* types */
import { TShoppingNullable } from '../../../../../types/Shopping';
import { TShop } from '../../../../../types/Shop';
/* utils */
import { formatPriceYen } from '../../../../../utils/function';
import { formatDay } from '../../../../../utils/FormatDate';

const ConfirmDeleteShoppingModal = ({
  focus,
  handleClose,
  handleOk,
  isLineNotice,
  isUseLineAtSetting,
  modaltitle,
  modalShopping,
  open,
  onChangeLineNotice,
  shops,
}: {
  focus?: boolean;
  handleClose: any;
  handleOk: any;
  isLineNotice: boolean;
  isUseLineAtSetting: boolean;
  modaltitle: TModalTitle;
  modalShopping: TShoppingNullable;
  open: boolean;
  onChangeLineNotice: any;
  shops: TShop[];
}): JSX.Element => {
  return (
    <ConfirmModal {...{ focus, open, handleClose, handleOk, modaltitle }}>
      <dl className={'list'}>
        <dt>{SHOPPING_FORM.PRICE.LABEL}</dt>
        <dd>{modalShopping.price ? formatPriceYen(modalShopping.price) : ''}</dd>
      </dl>
      <dl className={'list'}>
        <dt>{SHOPPING_FORM.DATE.LABEL}</dt>
        <dd>{modalShopping.date ? formatDay(modalShopping.date) : ''}</dd>
      </dl>
      <dl className={'list'}>
        <dt>{SHOPPING_FORM.SHOP_ID.LABEL}</dt>
        <dd>
          {modalShopping.shopId ? shops.find(({ id }) => id === modalShopping.shopId)?.name : ''}
        </dd>
      </dl>
      <dl className={'list'}>
        <dt>{SHOPPING_FORM.DESCRIPTION.LABEL}</dt>
        <dd>{modalShopping.description ? modalShopping.description : 'なし'}</dd>
      </dl>
      <dl className={'list'}>
        <dt>買い物の{SHOPPING_FORM.IS_LINE_NOTICE.LABEL}</dt>
        <dd>{modalShopping?.isLineNotice ? '通知済' : '未通知'}</dd>
      </dl>
      {/* LINE通知(isLineNotice) */}
      <LabelAndSwitch
        className={'mt-2'}
        checked={isLineNotice}
        disabled={!isUseLineAtSetting}
        helperText={!isUseLineAtSetting && <IsUseLineHelper />}
        onChange={onChangeLineNotice}
        id={SHOPPING_FORM.IS_LINE_NOTICE.ID}
        label={`${SHOPPING_FORM.IS_LINE_NOTICE.LABEL}${isLineNotice ? 'ON' : 'OFF'}`}
      />
    </ConfirmModal>
  );
};

export default ConfirmDeleteShoppingModal;

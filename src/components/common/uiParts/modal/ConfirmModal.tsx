import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BaseModal, CloseButton, BaseButton } from '../../uiParts';
import { TIconType } from '../button/BaseSwitchIcon';

export type TModalTitle = '入力' | '変更' | '削除' | '請求' | '請求受領' | '請求削除';
interface TProps {
  open: boolean;
  focus?: boolean;
  handleClose: VoidFunction;
  handleOk: VoidFunction;
  children: ReactNode;
  modaltitle?: TModalTitle;
}

const ConfirmModal = ({
  children,
  focus,
  handleClose,
  handleOk,
  open,
  modaltitle = '入力',
}: TProps): JSX.Element => {
  let buttonName = '';
  let customType: TIconType = 'normal';
  switch (modaltitle) {
    case '入力':
    case '請求':
    case '請求受領':
      buttonName = '登録';
      customType = 'addCircleOutline';
      break;
    case '変更':
      buttonName = '更新';
      customType = 'update';
      break;
    case '削除':
    case '請求削除':
      buttonName = '削除';
      customType = 'delete';
      break;
  }

  return (
    <BaseModal {...{ handleClose, open }}>
      <CloseButton className={'right-2 top-3 absolute'} handleClose={handleClose} />
      <Wrap className="Wrap">
        <h4 className={'font-bold text-center text-lg mb-3'}>{modaltitle}確認</h4>
        {children}
        <div className="flex justify-center mb-3 mt-5">
          <BaseButton customType={customType} focus={focus} onClick={handleOk} type={'submit'}>
            {buttonName}
          </BaseButton>
          <BaseButton className={'ml-5'} onClick={handleClose} customType={'arrowBack'}>
            戻る
          </BaseButton>
        </div>
      </Wrap>
    </BaseModal>
  );
};

const Wrap = styled.div`
  padding: 25px 30px 10px;
  width: 100%;
  .list {
    padding: 8px 0;
    border-bottom: solid 1px lightgrey;
    > dt {
      font-weight: bold;
    }
  }
  > dl:first-of-type {
    border-top: solid 1px lightgrey;
  }
`;

export default ConfirmModal;

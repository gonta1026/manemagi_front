import React, { ReactNode } from 'react';
import styled from 'styled-components';
import BaseModal from './BaseModal';
import { CloseButton, BaseButton } from '../uiParts/atoms';
import { TIconType } from '../uiParts/atoms/button/BaseSwitchIcon';

type TModalTitle = '入力' | '変更' | '削除' | '請求受領';
interface TProps {
  open: boolean;
  handleClose: VoidFunction;
  handleOk: VoidFunction;
  children: ReactNode;
  modaltitle?: TModalTitle;
}

const ConfirmModal = ({
  children,
  handleClose,
  handleOk,
  open,
  modaltitle = '入力',
}: TProps): JSX.Element => {
  let buttonName = '';
  let customType: TIconType = 'normal';
  switch (modaltitle) {
    case '入力':
    case '請求受領':
      buttonName = '登録';
      customType = 'addCircleOutline';
      break;
    case '変更':
      buttonName = '更新';
      customType = 'update';
      break;
    case '削除':
      buttonName = '削除';
      customType = 'delete';
      break;
  }

  return (
    <BaseModal {...{ handleClose, open }}>
      <CloseButton className={'right-2 top-3 absolute'} handleClose={handleClose} />
      <Wrap className="Wrap">
        <h4 className={'font-bold text-center text-lg my-3'}>{modaltitle}確認</h4>
        {children}
        <div className="flex justify-center mb-3 mt-5">
          <BaseButton focus onClick={handleOk} type={'submit'} customType={customType}>
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
  > dl {
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

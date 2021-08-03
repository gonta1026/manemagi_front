import React, { ReactNode } from 'react';
import styled from 'styled-components';
import BaseModal from './BaseModal';
import { CloseButton, BaseButton } from '../uiParts/atoms';

interface TProps {
  open: boolean;
  handleClose: VoidFunction;
  handleOk: VoidFunction;
  children: ReactNode;
}

const ConfirmModal = ({ children, handleClose, handleOk, open }: TProps): JSX.Element => {
  return (
    <BaseModal {...{ handleClose, open }}>
      <Wrap className="Wrap">
        <CloseButton className={'right-1 top-1'} handleClose={handleClose} />
        <h4 className={'font-bold text-center text-lg my-3'}>入力確認</h4>
        {children}
        <div className="flex justify-center mb-3 mt-5">
          <BaseButton focus onClick={handleOk} type={'submit'} customType={'addCircleOutline'}>
            登録
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

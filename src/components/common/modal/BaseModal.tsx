import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Dialog } from '@material-ui/core';
import { CloseButton, BaseButton } from '../../common/uiParts/atoms';

interface TProps {
  open: boolean;
  handleClose: VoidFunction;
  handleOk: VoidFunction;
  children: ReactNode;
}

const BaseModal = ({ children, handleClose, handleOk, open }: TProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
    >
      <Wrap className="Wrap">
        <CloseButton className={'right-1 top-1'} handleClose={handleClose} />
        <h4 className={'font-bold text-center'}>入力確認</h4>
        {children}
        <div className="flex justify-center mt-5">
          <BaseButton focus onClick={handleOk} type={'submit'}>
            登録
          </BaseButton>
          <BaseButton className={'ml-5'} onClick={handleClose} type={'submit'}>
            戻る
          </BaseButton>
        </div>
      </Wrap>
    </Dialog>
  );
};

const Wrap = styled.div`
  padding: 25px 10px 10px;
  width: 100%;
`;

export default BaseModal;

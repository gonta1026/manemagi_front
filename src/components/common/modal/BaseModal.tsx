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
        {children}
        <div className="flex justify-center mt-5">
          <BaseButton
            color={'primary'}
            focus
            onClick={handleOk}
            type={'submit'}
            variant={'contained'}
          >
            登録
          </BaseButton>
          <BaseButton
            className={'ml-5'}
            color={'secondary'}
            onClick={handleClose}
            type={'submit'}
            variant={'contained'}
          >
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

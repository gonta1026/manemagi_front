import * as React from 'react';
import styled from 'styled-components';

interface TProps {
  className?: string;
  handleClose: VoidFunction;
}

const CloseButton = ({ className, handleClose }: TProps): JSX.Element => (
  <Button className={className} onClick={handleClose}>
    <span>✖️</span>
  </Button>
);

const Button = styled.div`
  position: absolute;
  content: '';
  cursor: pointer;
  padding: 2px 6px;
  width: 30px;
  height: 30px;
  font-size: 23px;
  color: #000;
  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default CloseButton;

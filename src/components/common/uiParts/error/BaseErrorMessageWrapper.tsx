import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseErrorMessagesWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element => {
  return <Wrapper className={className + ' text-xs'}>{children}</Wrapper>;
};

const Wrapper = styled.ul`
  color: red;
  &:nth-of-type(n + 2) {
    margin-top: 5px;
  }
`;

export default BaseErrorMessagesWrapper;

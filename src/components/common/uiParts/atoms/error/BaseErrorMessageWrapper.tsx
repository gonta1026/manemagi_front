import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseErrorMessagesWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

const Wrapper = styled.ul`
  font-size: 80%;
  color: red;
  &:nth-of-type(n + 2) {
    margin-top: 5px;
  }
`;

export default BaseErrorMessagesWrapper;

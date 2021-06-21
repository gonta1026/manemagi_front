import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { mediaSize } from '../../const/media';

const BasePageTitle = ({ children }: { children: ReactNode }) => {
  return <Heading>{children}</Heading>;
};

const Heading = styled.h1`
  font-size: 30px;
  text-align: center;
  @media (max-width: ${mediaSize.MD}px) {
    font-size: 25px;
  }
`;

export default BasePageTitle;

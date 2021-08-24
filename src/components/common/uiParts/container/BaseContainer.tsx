import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 92%;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 70px;
  @media (min-width: 640px) {
    padding-bottom: 40px;
  }
`;

export default BaseContainer;

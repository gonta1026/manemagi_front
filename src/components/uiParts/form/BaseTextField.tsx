import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseTextField = ({ children }: { children: ReactNode }) => {
  return <TextField>{children}</TextField>;
};

const TextField = styled.div`
  width: 92%;
  max-width: 600px;
  margin: 0 auto;
`;

export default BaseTextField;

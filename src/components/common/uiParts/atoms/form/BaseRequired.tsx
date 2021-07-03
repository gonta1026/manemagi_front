import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseRequired = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <Required className={className}>{children}</Required>;
};

const Required = styled.span`
  padding: 3px 5px;
  margin-left: 3px;
  font-size: 70%;
  background-color: red;
  color: #fff;
  vertical-align: 1px;
  border-radius: 5px;
`;

export default BaseRequired;

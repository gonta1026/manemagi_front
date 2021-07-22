import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseHelperText = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element => <HelperText className={className}>{children}</HelperText>;

const HelperText = styled.p`
  font-size: 12px;
  color: gray;
  > a {
    color: rgba(59, 130, 246, 1);
  }
`;

export default BaseHelperText;

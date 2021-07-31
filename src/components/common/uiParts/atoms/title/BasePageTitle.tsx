import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { mediaSize } from '../../../../../const/media';
import { COLORS } from '../../../../../const/color';

const BasePageTitle = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <Heading className={className}>
      <span>{children}</span>
    </Heading>
  );
};

const Heading = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  > span {
    padding-bottom: 10px;
    border-bottom: 2px solid ${COLORS.TEXT_GREEN};
  }
  @media (max-width: ${mediaSize.MD}px) {
    font-size: 25px;
  }
`;

export default BasePageTitle;

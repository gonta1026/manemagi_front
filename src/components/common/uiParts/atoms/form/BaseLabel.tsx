import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseLabel = ({
  className = '',
  children,
  htmlFor,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  htmlFor: string;
  onClick?: VoidFunction;
}) => {
  return <Label {...{ className, htmlFor, onClick }}>{children}</Label>;
};

const Label = styled.label``;

export default BaseLabel;

import React, { ReactNode } from 'react';
import styled from 'styled-components';

const BaseLabel = ({
  className = '',
  children,
  htmlFor,
}: {
  className?: string;
  children: ReactNode;
  htmlFor: string;
}) => {
  return (
    <Label className={className} htmlFor={htmlFor}>
      {children}
    </Label>
  );
};

const Label = styled.label``;

export default BaseLabel;

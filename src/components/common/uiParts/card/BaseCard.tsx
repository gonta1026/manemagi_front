import React, { ReactNode } from 'react';
import { Card } from '@material-ui/core';

const BaseCard = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element => {
  return <Card className={className}>{children}</Card>;
};

export default BaseCard;

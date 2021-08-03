import React, { ReactNode } from 'react';
import { BaseCard } from '../../uiParts/atoms';
import ShoppingCardLinkGroup from './ShoppingCardLinkGroup';

const ShoppingCardWrapper = ({
  children,
  className,
  isDeleteShow,
  onClick,
  detailPathName,
}: {
  className?: string;
  children: ReactNode;
  detailPathName: string;
  editPathName?: string;
  onClick: any;
  isDetailShow?: boolean;
  isEditShow?: boolean;
  isDeleteShow?: boolean;
}): JSX.Element => {
  return (
    <BaseCard className={className}>
      {children}
      <ShoppingCardLinkGroup
        className={'mt-2 text-right'}
        detailPathName={detailPathName}
        onClick={onClick}
        isDeleteShow={isDeleteShow}
      />
    </BaseCard>
  );
};

export default ShoppingCardWrapper;

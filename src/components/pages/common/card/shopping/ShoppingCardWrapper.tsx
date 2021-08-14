import React, { ReactNode } from 'react';
import { BaseCard } from '../../../../common/uiParts';
import ShoppingCardLinkGroup from './ShoppingCardLinkGroup';

const ShoppingCardWrapper = ({
  children,
  className,
  editPathName,
  isDeleteShow,
  isEditShow,
  onClick,
  detailPathName,
}: {
  className?: string;
  children: ReactNode;
  detailPathName: string;
  editPathName?: string;
  onClick?: any;
  isDetailShow?: boolean;
  isEditShow?: boolean;
  isDeleteShow?: boolean;
}): JSX.Element => {
  return (
    <BaseCard className={className}>
      {children}
      <ShoppingCardLinkGroup
        {...{ detailPathName, editPathName, isDeleteShow, isEditShow, onClick }}
        className={'mt-2 text-right'}
      />
    </BaseCard>
  );
};

export default ShoppingCardWrapper;

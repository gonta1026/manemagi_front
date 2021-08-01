import React, { ReactNode } from 'react';
import { BaseCard } from '../../uiParts/atoms';
import CardLinkGroup from './CardLinkGroup';

const CardWrapper = ({
  children,
  className,
  isDeleteShow,
  isEditShow,
  editPathName,
  detailPathName,
}: {
  className?: string;
  children: ReactNode;
  detailPathName: string;
  editPathName: string;
  isDetailShow?: boolean;
  isEditShow?: boolean;
  isDeleteShow?: boolean;
}): JSX.Element => {
  return (
    <BaseCard className={className}>
      {children}
      <CardLinkGroup
        className={'mt-2 text-right'}
        detailPathName={detailPathName}
        editPathName={editPathName}
        isEditShow={isEditShow}
        isDeleteShow={isDeleteShow}
      />
    </BaseCard>
  );
};

export default CardWrapper;

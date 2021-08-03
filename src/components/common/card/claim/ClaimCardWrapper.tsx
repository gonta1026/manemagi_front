import React, { ReactNode } from 'react';
import { BaseCard } from '../../uiParts/atoms';
import ClaimCardLinkGroup from './ClaimCardLinkGroup';

const ClaimCardWrapper = ({
  className,
  children,
  deleteOnClick,
  detailPathName,
  isDetailShow,
  isDeleteShow,
  ReceiptOnClick,
}: {
  className?: string;
  children: ReactNode;
  detailPathName: string;
  deleteOnClick: any;
  isDetailShow?: boolean;
  isDeleteShow?: boolean;
  ReceiptOnClick: any;
}): JSX.Element => {
  return (
    <BaseCard className={className}>
      {children}
      <ClaimCardLinkGroup
        className={'mt-2 text-right'}
        detailPathName={detailPathName}
        isDetailShow={isDetailShow}
        isDeleteShow={isDeleteShow}
        ReceiptOnClick={ReceiptOnClick}
        deleteOnClick={deleteOnClick}
      />
    </BaseCard>
  );
};

export default ClaimCardWrapper;

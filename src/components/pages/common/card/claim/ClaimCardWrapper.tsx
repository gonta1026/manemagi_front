import React, { ReactNode } from 'react';
import { BaseCard } from '../../../../common/uiParts';
import ClaimCardLinkGroup from './ClaimCardLinkGroup';

const ClaimCardWrapper = ({
  className,
  children,
  deleteOnClick,
  detailPathName,
  isReceiptShow,
  isDetailShow,
  isDeleteShow,
  ReceiptOnClick,
}: {
  className?: string;
  children: ReactNode;
  detailPathName: string;
  deleteOnClick: any;
  isReceiptShow?: boolean;
  isDetailShow?: boolean;
  isDeleteShow?: boolean;
  ReceiptOnClick: any;
}): JSX.Element => {
  return (
    <BaseCard className={className}>
      {children}
      <ClaimCardLinkGroup
        className={'mt-2 text-right'}
        {...{
          detailPathName,
          isDetailShow,
          isDeleteShow,
          isReceiptShow,
          ReceiptOnClick,
          deleteOnClick,
        }}
      />
    </BaseCard>
  );
};

export default ClaimCardWrapper;

import React from 'react';
import styled from 'styled-components';
import { BaseLink, BaseButton } from '../../../../common/uiParts';

const CardLinkGroup = ({
  className,
  detailPathName,
  deleteOnClick,
  isDetailShow = true,
  isDeleteShow = true,
  ReceiptOnClick,
}: {
  className?: string;
  detailPathName: string;
  deleteOnClick: any;
  isDetailShow?: boolean;
  isDeleteShow?: boolean;
  ReceiptOnClick: any;
}): JSX.Element => {
  return (
    <LinkGroup className={className}>
      {isDetailShow && (
        <BaseLink pathname={detailPathName}>
          <BaseButton customType={'description'}>詳細</BaseButton>
        </BaseLink>
      )}
      <BaseButton customType={'receipt'} onClick={ReceiptOnClick}>
        受領
      </BaseButton>
      {isDeleteShow && (
        <BaseButton customType={'delete'} onClick={deleteOnClick}>
          削除
        </BaseButton>
      )}
    </LinkGroup>
  );
};

const LinkGroup = styled.div`
  text-align: right;
  > * {
    :nth-child(n + 2) {
      margin-left: 6px;
    }
  }
`;

export default CardLinkGroup;

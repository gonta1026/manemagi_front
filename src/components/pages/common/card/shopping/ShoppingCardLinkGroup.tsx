import React from 'react';
import styled from 'styled-components';
import { BaseLink, BaseButton } from '../../../../common/uiParts';

const ShoppingCardLinkGroup = ({
  className,
  detailPathName,
  editPathName,
  onClick,
  isDetailShow = true,
  isEditShow = true,
  isDeleteShow = true,
}: {
  className?: string;
  detailPathName: string;
  editPathName?: string;
  onClick: any;
  isDetailShow?: boolean;
  isEditShow?: boolean;
  isDeleteShow?: boolean;
}): JSX.Element => {
  return (
    <LinkGroup className={className}>
      {isDetailShow && (
        <BaseLink pathname={detailPathName}>
          <BaseButton customType={'description'}>詳細</BaseButton>
        </BaseLink>
      )}
      {isEditShow && (
        <>
          <BaseLink pathname={editPathName!}>
            <BaseButton customType={'edit'}>編集</BaseButton>
          </BaseLink>
        </>
      )}
      {isDeleteShow && (
        <BaseButton customType={'delete'} onClick={onClick}>
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

export default ShoppingCardLinkGroup;

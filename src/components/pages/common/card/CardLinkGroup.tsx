import React from 'react';
import styled from 'styled-components';
import { BaseLink, BaseButton } from '../../../common/uiParts/atoms';

const CardLinkGroup = ({
  className,
  detailPathName,
  editPathName,
  isEditAndDeleteShow,
}: {
  className?: string;
  detailPathName: string;
  editPathName: string;
  isEditAndDeleteShow: boolean;
}): JSX.Element => {
  return (
    <LinkGroup className={className}>
      <BaseLink pathname={detailPathName}>
        <BaseButton customType={'description'}>詳細</BaseButton>
      </BaseLink>
      {isEditAndDeleteShow && (
        <>
          <BaseLink pathname={editPathName}>
            <BaseButton customType={'edit'}>編集</BaseButton>
          </BaseLink>
          <BaseButton customType={'delete'}>削除</BaseButton>
        </>
      )}
    </LinkGroup>
  );
};

const LinkGroup = styled.div`
  text-align: right;
  > * {
    :nth-child(n + 2) {
      margin-left: 10px;
    }
  }
`;

export default CardLinkGroup;

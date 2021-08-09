import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle } from '../../components/common/uiParts/atoms';
import { BaseLinkButton } from '../../components/common/molecules';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchClaims } from '../../reducks/services/Claim';
/* types */
import { TClaim } from '../../types/Claim';
/* utils */
import { formatPriceYen } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';

const Claim = (): JSX.Element => {
  const [claims, setClaims] = useState<TClaim[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchClaimsAndSetClaims();
  }, []);

  const fetchClaimsAndSetClaims = async () => {
    const response: any = await dispatch(fetchClaims());
    if (response.payload.status === 'success') {
      const claims: TClaim[] = response.payload.data;
      setClaims(claims);
    }
  };

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>{page.claim.list.name()}</BasePageTitle>
      <ul className="py-4">
        {claims.map((claim, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <div>請求日：{formatDay(claim.createdAt)}</div>
            <div>LINE通知：{claim.isLineNotice ? '通知済' : '未通知'}</div>
            <div>合計金額：{formatPriceYen ? formatPriceYen(claim.totalPrice) : ''}</div>
            <div className={'mt-2 text-right'}>
              <BaseLinkButton
                customType={'description'}
                pathname={page.claim.show.link(claim.id.toString())}
              >
                詳細
              </BaseLinkButton>
            </div>
          </li>
        ))}
      </ul>
    </CommonWrapTemplate>
  );
};

export default Claim;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle, BaseLink, BaseButton } from '../../components/common/uiParts/atoms';
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
      <BasePageTitle className={'my-5'}>{page.shopping.list.name()}</BasePageTitle>
      <p>一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討。</p>
      <p>ソート機能、絞り込み機能、ページネーション、表示件数の制御をできたら入れたい。</p>
      <ul className="py-4">
        {claims.map((claim, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <div>請求日：{formatDay(claim.createdAt)}</div>
            <div>LINE通知：{claim.isLineNotice ? '通知済' : '未通知'}</div>
            <div>合計金額：{formatPriceYen(claim.totalPrice)}</div>
            <div className={'mt-2 text-center'}>
              <BaseLink pathname={page.claim.show.link(claim.id.toString())}>
                <BaseButton>詳細</BaseButton>
              </BaseLink>
            </div>
          </li>
        ))}
      </ul>
    </CommonWrapTemplate>
  );
};

export default Claim;

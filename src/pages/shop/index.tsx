import React, { useEffect } from 'react';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle } from '../../components/common/uiParts';
//customHook */
/* customHook */
import { useShop, useToastAction } from '../../customHook';
/* pageMap */
import { page } from '../../pageMap';
/* modules */
import Notice from '../../modules/Notice';

const Shop = (): JSX.Element => {
  const { shops, fetchShopsAndSet } = useShop();

  const toastActions = useToastAction();

  useEffect(() => {
    Notice.pageMovedNotice(toastActions);
    fetchShopsAndSet();
  }, []);

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <BasePageTitle className={'my-5'}>{page.shop.list.name()}</BasePageTitle>
      <ul className="py-4">
        {shops.map((shop, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <div>店名：{shop.name}</div>
            <div>説明：{shop.description}</div>
          </li>
        ))}
      </ul>
    </CommonWrapTemplate>
  );
};

export default Shop;

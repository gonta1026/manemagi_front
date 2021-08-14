import React, { useEffect } from 'react';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle } from '../../components/common/uiParts';
//customHook */
import { useShop } from '../../customHook';
/* pageMap */
import { page } from '../../pageMap';

const Shop = (): JSX.Element => {
  const { shops, fetchShopsAndSet } = useShop();

  useEffect(() => {
    fetchShopsAndSet();
  }, []);

  return (
    <CommonWrapTemplate>
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

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
/* components */
import { useClaim } from '../../../../customHook';
/* components */
import CommonWrapTemplate from '../../../../components/common/layout/CommonWrapTemplate';
import { ShoppingCardWrapper } from '../../../../components/pages/common';
import { LineNotice, BasePageTitle } from '../../../../components/common/uiParts';
/* pageMap */
import { page } from '../../../../pageMap';
/* utils */
import { formatPriceYen, ommisionText } from '../../../../utils/function';
import { formatDay } from '../../../../utils/FormatDate';

const ClaimShoppings = (): JSX.Element => {
  const router = useRouter();
  const { fetchClaimShoppingsAndSet, shoppings } = useClaim();

  useEffect(() => {
    fetchClaimShoppingsAndSet(router.query.Id as string);
  }, [router]);

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>{page.claim.shopping.name()}</BasePageTitle>

      {shoppings.length ? (
        <>
          <div className="mt-10 space-y-3">
            {shoppings.map((shopping, index) => (
              <ShoppingCardWrapper
                className={'border-t-2 p-3 relative'}
                detailPathName={page.shopping.show.link(shopping.id!.toString())}
                isEditShow={false}
                isDeleteShow={false}
                key={index}
              >
                <div className="flex justify-between">
                  <div className="left">
                    <div>買い物日：{formatDay(shopping.date!)}</div>
                    <div>金額：{formatPriceYen(shopping.price)}</div>
                    <div>
                      説明：{shopping.description ? ommisionText(shopping.description, 20) : 'なし'}
                    </div>
                  </div>
                  <div className="right">
                    <LineNotice
                      isLineNotice={shopping.isLineNoticed}
                      text={shopping.isLineNoticed ? '買い物通知済' : '買い物未通知'}
                    />
                  </div>
                </div>
              </ShoppingCardWrapper>
            ))}
          </div>
        </>
      ) : (
        <p className={'mt-3'}>未請求の買い物登録はありません。</p>
      )}
    </CommonWrapTemplate>
  );
};

export default ClaimShoppings;

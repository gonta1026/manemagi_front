import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle, BaseLinkButton, BaseButton } from '../../../components/common/uiParts';
import { ConfirmDeleteShoppingModal } from '../../../components/pages/common';
/* customHook */
import { useToastAction, useShop } from '../../../customHook';
/* pageMap */
import { page } from '../../../pageMap';
/* reducks */
import { fetchShopping, deleteShopping } from '../../../reducks/services/Shopping';
/* types */
import { TShopping, initialShopping, TShoppingNullable } from '../../../model/shopping';
import { settingAndUser } from '../../../model/setting';
/* utils */
import { formatPriceYen, ommisionText } from '../../../utils/function';
import { formatDay } from '../../../utils/FormatDate';
import { noticeStorageValues } from '../../../modules/Notice';
import Notice from '../../../modules/Notice';

const ShoppingShow = (): JSX.Element => {
  const [shopping, setShopping] = useState<TShoppingNullable>(initialShopping);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
  const toastActions = useToastAction();
  const { shops, fetchShopsAndSet } = useShop();

  useEffect(() => {
    Notice.pageMovedNotice(toastActions);
    fetchShopsAndSet();
  }, []);

  useEffect(() => {
    fetchShoppingAndSetShopping();
  }, [router]);

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

  const fetchShoppingAndSetShopping = async () => {
    if (router.query.Id) {
      const response: any = await dispatch(fetchShopping(router.query.Id as string));
      if (response.payload.status === 'success') {
        const shopping: TShopping = response.payload.data;
        setShopping(shopping);
      }
    }
  };

  const deleteShoppingAndSetShopping = async () => {
    const shoppingId = String(shopping.id);
    setIsLoading(true);
    const response: any = await dispatch(
      deleteShopping({
        id: shoppingId,
        data: { isLineNotice: isLineNotice },
      }),
    );

    const { handleToastOpen } = toastActions;
    if (response.payload.status === 'success') {
      Notice.setItemAtPageMoveNotice(noticeStorageValues.deleteShopping);
      router.push(page.shopping.list.link());
    } else {
      handleToastOpen({
        message: `??????????????????????????????`,
        severity: 'error',
      });
      setIsLoading(false);
    }
  };

  return (
    <CommonWrapTemplate {...{ isLoading, toastActions }}>
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={() => deleteShoppingAndSetShopping()}
        isLineNotice={isLineNotice}
        modalShopping={shopping}
        modaltitle={'??????'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        shops={shops}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />
      <BasePageTitle className={'my-5'}>{page.shopping.show.name()}</BasePageTitle>
      <ul className="py-4">
        <li className={'p-3'}>
          <div>?????????{formatPriceYen ? formatPriceYen(shopping.price) : ''}</div>
          <div>?????????{formatDay(shopping.date!)}</div>
          <div>?????????{shops.find((shop) => shop.id === shopping.shopId)?.name}</div>
          <div>?????????{shopping.description ? ommisionText(shopping.description, 20) : '??????'}</div>
          <div>??????????????????{shopping.isLineNotice ? '????????????' : '?????????'}</div>
        </li>
      </ul>
      <div className="mt-5 text-center">
        {shopping.claimId === null && (
          <>
            <BaseLinkButton
              pathname={page.shopping.edit.link(router.query.Id! as string)}
              customType={'edit'}
            >
              ??????
            </BaseLinkButton>
            <BaseButton
              className={'ml-10'}
              customType={'delete'}
              onClick={() => {
                setDeleteModalOpen(true);
              }}
            >
              ??????
            </BaseButton>
            <hr className="my-5" />
          </>
        )}
        <BaseLinkButton pathname={page.shopping.list.link()} customType={'arrowBack'}>
          {page.shopping.list.name()}?????????
        </BaseLinkButton>
      </div>
    </CommonWrapTemplate>
  );
};

export default ShoppingShow;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle, BaseLinkButton, BaseButton } from '../../../components/common/uiParts';
import { ConfirmDeleteShoppingModal } from '../../../components/pages/common';
/* customHook */
import useToastAction from '../../../customHook/useToastAction';
/* pageMap */
import { page } from '../../../pageMap';
/* reducks */
import { fetchShops } from '../../../reducks/services/Shop';
import { fetchShopping, deleteShopping } from '../../../reducks/services/Shopping';
/* types */
import { TShopping } from '../../../types/Shopping';
import { settingAndUser } from '../../../types/Setting';
import { TShop } from '../../../types/Shop';
/* utils */
import { storageKeys, noticeStorageValues } from '../../../modules/LocalStorage';
import { formatPriceYen, ommisionText } from '../../../utils/function';
import { formatDay } from '../../../utils/FormatDate';
import Notice from '../../../modules/Notice';

const ShoppingShow = (): JSX.Element => {
  const [shopping, setShopping] = useState<TShopping>({
    id: null,
    price: null,
    date: null,
    description: '',
    isLineNotice: false,
    isLineNoticed: false,
    shopId: null,
    claimId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const router = useRouter();
  const [shops, setShops] = useState<TShop[]>([]);
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toastActions = useToastAction();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  useEffect(() => {
    shoppingedUpdateNotice();
    fetchShopsAndSetShops();
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

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    const shops: TShop[] = response.payload.data.shops;
    setShops(shops);
  };

  const shoppingedUpdateNotice = () => {
    const notice = new Notice();
    const targetNotice = notice.getStorageItem(storageKeys.pageMoveNotice)!;
    const message = notice.getNoticeMessage(targetNotice);
    notice.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  };

  const deleteShoppingAndSetShopping = async () => {
    const shoppingId = String(shopping.id);
    const response: any = await dispatch(
      deleteShopping({
        id: shoppingId,
        data: { isLineNotice: isLineNotice },
      }),
    );

    const { handleToastOpen } = toastActions;
    if (response.payload.status === 'success') {
      const notice = new Notice();
      notice.setItemAtPageMoveNotice(noticeStorageValues.deleteShopping);
      router.push(page.shopping.list.link());
    } else {
      handleToastOpen({
        message: `削除に失敗しました。`,
        severity: 'error',
      });
    }
  };

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={() => deleteShoppingAndSetShopping()}
        isLineNotice={isLineNotice}
        modalShopping={shopping}
        modaltitle={'削除'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        shops={shops}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />
      <BasePageTitle className={'my-5'}>{page.shopping.show.name()}</BasePageTitle>
      <ul className="py-4">
        <li className={'p-3'}>
          <div>金額：{formatPriceYen ? formatPriceYen(shopping.price) : ''}</div>
          <div>日付：{formatDay(shopping.date!)}</div>
          <div>お店：{shops.find((shop) => shop.id === shopping.shopId)?.name}</div>
          <div>説明：{shopping.description ? ommisionText(shopping.description, 20) : 'なし'}</div>
          <div>ライン通知：{shopping.isLineNotice ? '通知済み' : '未通知'}</div>
        </li>
      </ul>
      <div className="mt-5 text-center">
        <BaseLinkButton
          pathname={page.shopping.edit.link(router.query.Id! as string)}
          size={'large'}
          customType={'edit'}
        >
          編集
        </BaseLinkButton>
        <BaseButton
          className={'ml-10'}
          customType={'delete'}
          onClick={() => {
            setDeleteModalOpen(true);
          }}
          size={'large'}
        >
          削除
        </BaseButton>
        <hr className="my-5" />
        <BaseLinkButton pathname={page.shopping.list.link()} size={'large'}>
          {page.shopping.list.name()}へ戻る
        </BaseLinkButton>
      </div>
    </CommonWrapTemplate>
  );
};

export default ShoppingShow;

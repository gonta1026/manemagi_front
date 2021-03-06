import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TShopping,
  TShoppingNullable,
  ResponseFetchShoppings,
  ResponseDeleteShopping,
} from '../../model/shopping';
import { fetchShoppings, deleteShopping } from '../../reducks/services/Shopping';

const useShopping = () => {
  const [shoppings, setShopping] = useState<TShoppingNullable[]>([]);
  const dispatch = useDispatch();

  const fetchNoClaimShoppingsAndSet = async () => {
    const response: { payload: ResponseFetchShoppings } = await dispatch(fetchShoppings() as any);
    if (response.payload.status === 'success') {
      const shoppings = response.payload.data;
      const noClaimShoppings = shoppings.filter(
        (shopping): shopping is Utilty.Change<TShopping, 'claimId', null> =>
          shopping.claimId === null,
      );
      setShopping(noClaimShoppings);
    }
  };

  const fetchShoppingsAndSet = async () => {
    const response: { payload: ResponseFetchShoppings } = await dispatch(fetchShoppings() as any);
    if (response.payload.status === 'success') {
      const shoppings = response.payload.data;
      setShopping(shoppings);
    }
  };

  const deleteShoppingAndSet = async (
    shopping: TShoppingNullable,
    isLineNotice: boolean,
    toastActions: any,
  ) => {
    const shoppingId = String(shopping.id);
    const response: { payload: ResponseDeleteShopping } = await dispatch(
      deleteShopping({
        id: shoppingId,
        data: { isLineNotice },
      }) as any,
    );

    const { handleToastOpen } = toastActions;
    if (response.payload.status === 'success') {
      fetchNoClaimShoppingsAndSet();
      handleToastOpen({
        message: `買い物を削除しました。`,
        severity: 'success',
      });
    } else {
      handleToastOpen({
        message: `削除に失敗しました。`,
        severity: 'error',
      });
    }
  };

  return { shoppings, fetchShoppingsAndSet, fetchNoClaimShoppingsAndSet, deleteShoppingAndSet };
};

export default useShopping;

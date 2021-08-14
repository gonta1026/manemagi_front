import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TShopping } from '../../types/Shopping';
import { fetchShoppings, deleteShopping } from '../../reducks/services/Shopping';

const useShopping = () => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const dispatch = useDispatch();

  const fetchNoClaimShoppingsAndSet = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      const noClaimShoppings = shoppings.filter((shopping) => shopping.claimId === null);
      setShopping(noClaimShoppings);
    }
  };

  const fetchShoppingsAndSet = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      const noClaimShoppings = shoppings.filter((shopping) => shopping.claimId === null);
      setShopping(noClaimShoppings);
    }
  };

  const deleteShoppingAndSet = async (
    shopping: TShopping,
    isLineNotice: boolean,
    toastActions: any,
  ) => {
    const shoppingId = String(shopping.id);
    const response: any = await dispatch(
      deleteShopping({
        id: shoppingId,
        data: { isLineNotice },
      }),
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

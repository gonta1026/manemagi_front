import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TShopping } from '../../types/Shopping';
import { fetchShoppings } from '../../reducks/services/Shopping';

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

  return { shoppings, fetchNoClaimShoppingsAndSet };
};

export default useShopping;

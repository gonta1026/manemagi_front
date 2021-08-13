import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TShop } from '../../types/Shop';
import { fetchShops } from '../../reducks/services/Shop';

const useIsAfterSsr = () => {
  const [shops, setShops] = useState<TShop[]>([]);
  const dispatch = useDispatch();

  const fetchShopsAndSet = async () => {
    const response: any = await dispatch(fetchShops());
    if (response.payload.status === 'success') {
      const shops: TShop[] = response.payload.data;
      console.log('shopsは', shops);
      setShops(shops);
    }
  };

  return { shops, fetchShopsAndSet };
};

export default useIsAfterSsr;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TShop, ResponseFetchShops } from '../../model/shop';
import { fetchShops } from '../../reducks/services/Shop';

const useShop = () => {
  const [shops, setShops] = useState<TShop[]>([]);
  const dispatch = useDispatch();

  const fetchShopsAndSet = async () => {
    const response: { payload: ResponseFetchShops } = await dispatch(fetchShops() as any);
    if (response.payload.status === 'success') {
      const shops = response.payload.data;
      setShops(shops);
    }
  };

  return { shops, fetchShopsAndSet };
};

export default useShop;

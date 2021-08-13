import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TClaim } from '../../types/Claim';
import { fetchClaims } from '../../reducks/services/Claim';

const useClaim = () => {
  const [claims, setClaims] = useState<TClaim[]>([]);
  const dispatch = useDispatch();

  const fetchClaimsAndSet = async () => {
    const response: any = await dispatch(fetchClaims());
    if (response.payload.status === 'success') {
      const claims: TClaim[] = response.payload.data;
      setClaims(claims);
    }
  };

  return { claims, fetchClaimsAndSet };
};

export default useClaim;

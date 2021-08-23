import { useState } from 'react';
import { useDispatch } from 'react-redux';
/* customHook */
import { ToastType } from '../../customHook/useToastAction';
/* reducks */
import {
  fetchClaims,
  updateClaim,
  deleteClaim,
  fetchClaimShoppings,
} from '../../reducks/services/Claim';
/* types */
import {
  TClaim,
  TClaimNullable,
  ResponseFetchClaims,
  ResponseUpdateClaim,
  ResponseFetchClaimShoppings,
  ResponseDeleteClaim,
} from '../../model/claim';
import { TShopping } from '../../model/shopping';

const useClaim = () => {
  const [claims, setClaims] = useState<TClaim[]>([]);
  const [shoppings, setShoppings] = useState<TShopping[]>([]);
  const dispatch = useDispatch();
  const fetchClaimsAndSet = async () => {
    const response: { payload: ResponseFetchClaims } = (await dispatch(fetchClaims())) as any;
    if (response.payload.status === 'success') {
      const claims = response.payload.data;
      setClaims(claims);
    }
  };

  const updateClaimAndSet = async (
    claim: TClaimNullable,
    isLineNotice: boolean,
    toastActions: ToastType,
  ) => {
    const claimId = String(claim.id);
    const response: { payload: ResponseUpdateClaim } = await dispatch(
      updateClaim({
        id: claimId,
        data: { isLineNotice, isReceipt: true },
      }) as any,
    );

    const { handleToastOpen } = toastActions;
    if (response.payload.status === 'success') {
      fetchClaimsAndSet();
      handleToastOpen({
        message: `請求受領を登録しました。`,
        severity: 'success',
      });
    } else {
      handleToastOpen({
        message: `請求受領の登録に失敗しました。`,
        severity: 'error',
      });
    }
  };

  const deleteClaimAndSet = async (
    claim: TClaimNullable,
    isLineNotice: boolean,
    toastActions: ToastType,
  ) => {
    const claimId = String(claim.id);
    const response: { payload: ResponseDeleteClaim } = (await dispatch(
      deleteClaim({
        id: claimId,
        data: { isLineNotice: isLineNotice },
      }),
    )) as any;
    const { handleToastOpen } = toastActions;
    if (response.payload.status === 'success') {
      fetchClaimsAndSet();
      handleToastOpen({
        message: `請求を削除しました。`,
        severity: 'success',
      });
    } else {
      handleToastOpen({
        message: `削除に失敗しました。`,
        severity: 'error',
      });
    }
  };

  const fetchClaimShoppingsAndSet = async (claimId: string) => {
    const response: { payload: ResponseFetchClaimShoppings } = (await dispatch(
      fetchClaimShoppings(claimId),
    )) as any;
    if (response.payload.status === 'success') {
      const shoppings = response.payload.data;
      console.log({ shoppings });
      setShoppings(shoppings);
    }
  };

  return {
    claims,
    shoppings,
    fetchClaimsAndSet,
    updateClaimAndSet,
    deleteClaimAndSet,
    fetchClaimShoppingsAndSet,
  };
};

export default useClaim;

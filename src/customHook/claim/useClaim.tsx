import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TClaim } from '../../types/Claim';
import { fetchClaims, updateClaim, deleteClaim } from '../../reducks/services/Claim';
import { ToastType } from '../../customHook/useToastAction';

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

  const updateClaimAndSet = async (
    claim: TClaim,
    isLineNotice: boolean,
    toastActions: ToastType,
  ) => {
    const claimId = String(claim.id);
    const response: any = await dispatch(
      updateClaim({
        id: claimId,
        data: { isLineNotice, isReceipt: true },
      }),
    );

    const { handleToastOpen } = toastActions;
    console.log(response);
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
    claim: TClaim,
    isLineNotice: boolean,
    toastActions: ToastType,
  ) => {
    const claimId = String(claim.id);
    const response: any = await dispatch(
      deleteClaim({
        id: claimId,
        data: { isLineNotice: isLineNotice },
      }),
    );
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

  return { claims, fetchClaimsAndSet, updateClaimAndSet, deleteClaimAndSet };
};

export default useClaim;

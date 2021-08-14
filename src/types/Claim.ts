import { TShopping } from './Shopping';

export const initialClaim = {
  id: null,
  isLineNotice: false,
  isLineNoticed: false,
  isReceipt: false,
  totalPrice: null, // NOTE DBのschemaには存在しない。
  userId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type TClaim = {
  id: number | null;
  isLineNotice: boolean;
  isLineNoticed: boolean;
  isReceipt: boolean;
  totalPrice: number | null; // NOTE DBのschemaには存在しない。
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TClaimForm = {
  isLineNotice: boolean;
  shoppingIds: number[];
};

export type TClaimFormikForm = Omit<TClaimForm, 'shoppingIds'> & {
  shoppings: TShopping[];
};

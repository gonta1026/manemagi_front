import { TShopping } from './Shopping';

export type TClaim = {
  id: number;
  isLineNotice: boolean;
  isReceipt: boolean;
  totalPrice: number; // NOTE DBのschemaには存在しない。
  userId: number;
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

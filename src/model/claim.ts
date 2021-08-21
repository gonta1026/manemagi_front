import { TShopping } from './shopping';

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
  id: number;
  isLineNotice: boolean;
  isLineNoticed: boolean;
  isReceipt: boolean;
  totalPrice: number; // NOTE DBのschemaには存在しない。
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TClaimNullable = Utilty.Nullable<TClaim, 'id' | 'totalPrice' | 'userId'>;

export type TClaimForm = Pick<TClaimNullable, 'isLineNotice'> & {
  shoppingIds: number[];
};

export type TClaimFormikForm = Omit<TClaimForm, 'shoppingIds'> & {
  shoppings: TShopping[];
};

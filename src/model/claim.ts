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
  userId: number;
  createdAt: Date;
  updatedAt: Date;
} & { totalPrice: number }; // NOTE DBのschemaには存在しない。

export type TClaimNullable = Utilty.Nullable<TClaim, 'id' | 'totalPrice' | 'userId'>;

export type TClaimForm = Pick<TClaimNullable, 'isLineNotice'> & {
  shoppingIds: number[];
};

export type TClaimFormikForm = Omit<TClaimForm, 'shoppingIds'> & {
  shoppings: TShopping[];
};

export type ResponseCreateClaim = {
  data: Omit<TClaim, 'totalPrice'>;
  status: 'success';
};

export type ResponseUpdateClaim = {
  data: Omit<TClaim, 'totalPrice'>;
  status: 'success';
};

export type ResponseDeleteClaim = {
  data: Omit<TClaim, 'totalPrice'>;
  status: 'success';
};

export type ResponseFetchClaims = {
  data: TClaim[];
  status: 'success';
};

export type ResponseNoClaimShoppings = {
  data: Utilty.Change<TShopping, 'claimId', null>;
  status: 'success';
};

export type ResponseFetchClaimShoppings = {
  data: TShopping[];
  status: 'success';
};

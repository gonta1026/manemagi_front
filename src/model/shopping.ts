export const initialShopping = {
  id: null,
  price: null,
  date: new Date(),
  description: '',
  isLineNotice: false,
  isLineNoticed: false,
  shopId: null,
  claimId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type TShopping = {
  id: number;
  price: number;
  date: Date | string;
  description: string;
  isLineNotice: boolean;
  isLineNoticed: boolean;
  shopId: number;
  claimId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TShoppingNullable = Utilty.Nullable<TShopping, 'id' | 'price' | 'shopId' | 'claimId'>;

export type TShoppingForm = Pick<
  TShoppingNullable,
  'price' | 'date' | 'description' | 'isLineNotice' | 'shopId'
>;

export type TShoppingFormError = Record<keyof TShoppingForm, string>;

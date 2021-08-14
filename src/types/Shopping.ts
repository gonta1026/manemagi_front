export const initialShopping = {
  id: null,
  price: null,
  date: null,
  description: '',
  isLineNotice: false,
  isLineNoticed: false,
  shopId: null,
  claimId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type TShopping = {
  id: number | null;
  price: number | null;
  date: Date | string | null;
  description: string | null;
  isLineNotice: boolean;
  isLineNoticed: boolean;
  shopId: number | null;
  claimId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TShoppingForm = Pick<
  TShopping,
  'price' | 'date' | 'description' | 'isLineNotice' | 'shopId'
>;

export type TShoppingFormError = Record<keyof TShoppingForm, string>;

export type TShopping = {
  id: number | null;
  price: number | null;
  date: Date | string | null;
  description: string | null;
  isLineNotice: boolean;
  shopId: number | null;
  claimId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export const shoppingInit = {
  id: null,
  price: null,
  date: null,
  description: '',
  isLineNotice: false,
  shopId: null,
  claimId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type TShoppingFormError = Record<
  'price' | 'date' | 'description' | 'isLineNotice' | 'shopId',
  string
>;

export type TShoppingForm = Pick<
  TShopping,
  'price' | 'date' | 'description' | 'isLineNotice' | 'shopId'
>;

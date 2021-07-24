export type TShopping = {
  id: number;
  price: number | null;
  date: Date | string | null;
  description: string | null;
  isLineNotice: boolean;
  shopId: number | null;
  claimId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TShoppingFormError = Record<
  'price' | 'date' | 'description' | 'isLineNotice' | 'shopId',
  string
>;

export type TShoppingForm = Pick<
  TShopping,
  'price' | 'date' | 'description' | 'isLineNotice' | 'shopId'
>;

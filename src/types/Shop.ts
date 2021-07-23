export type TShop = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type TShopForm = Pick<TShop, 'name' | 'description'>;

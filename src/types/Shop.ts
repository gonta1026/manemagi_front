export type TShop = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type TShopForm = Pick<TShop, 'name' | 'description'>;

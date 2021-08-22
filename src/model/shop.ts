import { ResponseError } from './common';

export type TShop = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type TShopForm = Pick<TShop, 'name' | 'description'>;

export type TShopFormError = Record<keyof TShopForm, string>;

export type ResponseCreateShop = {
  data: TShop;
  status: 'success';
};

export type ResponseFetchShops = {
  data: TShop[];
  status: 'success';
};

export type PayloadResponseCreateShop = {
  payload: ResponseCreateShop | ResponseError;
};

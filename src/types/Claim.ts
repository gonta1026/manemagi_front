export type TClaim = {
  id: number;
  isLineNotice: boolean;
  userId: number;
  totalPrice: number; // NOTE DBのschemaには存在しない。
  createdAt: Date;
  updatedAt: Date;
};

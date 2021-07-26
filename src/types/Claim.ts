export type TClaim = {
  id: number;
  isLineNotice: boolean;
  isGetClaim: boolean;
  totalPrice: number; // NOTE DBのschemaには存在しない。
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

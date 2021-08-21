export const LABEL_SHOPPING = {
  PRICE: '金額',
  DATE: '買い物日',
  DESCRIPTION: '説明',
  IS_LINE_NOTICE: 'LINEの通知',
  SHOP_ID: 'お店',
} as const;

export const SHOPPING_FORM = {
  PRICE: {
    LABEL: LABEL_SHOPPING.PRICE,
    ID: 'price',
  },
  DATE: {
    LABEL: LABEL_SHOPPING.DATE,
    ID: 'date',
  },
  DESCRIPTION: {
    LABEL: LABEL_SHOPPING.DESCRIPTION,
    ID: 'description',
  },
  IS_LINE_NOTICE: {
    LABEL: LABEL_SHOPPING.IS_LINE_NOTICE,
    ID: 'isLineNotice',
  },
  SHOP_ID: {
    LABEL: LABEL_SHOPPING.SHOP_ID,
    ID: 'shopId',
  },
} as const;

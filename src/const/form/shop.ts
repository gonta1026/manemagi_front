export const SHOP_LABEL = {
  NAME: '店名',
  DESCRIPTION: '説明',
} as const;

export const SHOP_ID = {
  NAME: 'name',
  DESCRIPTION: 'description',
} as const;

export const SHOPFORM = {
  NAME: {
    LABEL: SHOP_LABEL.NAME,
    ID: SHOP_ID.NAME,
  },
  DESCRIPTION: {
    LABEL: SHOP_LABEL.DESCRIPTION,
    ID: SHOP_ID.DESCRIPTION,
  },
} as const;

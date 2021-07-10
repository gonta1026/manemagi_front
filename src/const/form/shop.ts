export const LABEL_SHOPS = {
  NAME: '店名もしくは場所',
  DESCRIPTION: '説明',
} as const;

export const SHOPFORM = {
  NAME: {
    LABEL: LABEL_SHOPS.NAME,
    ID: 'name',
  },
  DESCRIPTION: {
    LABEL: LABEL_SHOPS.DESCRIPTION,
    ID: 'description',
  },
} as const;

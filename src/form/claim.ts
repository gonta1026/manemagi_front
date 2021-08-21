export const LABEL_CLAIM = {
IS_LINE_NOTICE: 'LINEの通知',
CREATED_AT: '請求日',
TOTAL_PRICE: '請求金額',
} as const;

export const CLAIM_FORM = {
IS_LINE_NOTICE: {
  LABEL: LABEL_CLAIM.IS_LINE_NOTICE,
  ID: 'isLineNotice',
},
} as const;

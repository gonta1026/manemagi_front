export const LABEL_SETTING = {
  LINE_NOTICE_TOKEN: 'LINEトークン',
  IS_USE_LINE: 'LINEのデフォルト通知',
} as const;

export const SETTINGFORM = {
  LINE_NOTICE_TOKEN: {
    LABEL: LABEL_SETTING.LINE_NOTICE_TOKEN,
    ID: 'lineNoticeToken',
  },
  IS_USE_LINE: {
    LABEL: LABEL_SETTING.IS_USE_LINE,
    ID: 'isUseLine',
  },
} as const;

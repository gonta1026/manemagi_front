export type TSetting = {
  isUseLine: boolean;
  lineNoticeToken: string;
};

export type TSettingFormError = {
  isUseLine: string;
  lineNoticeToken: string;
};

export type settingAndUser = {
  user: {
    id: number | null;
    name: string;
    setting: TSetting;
  };
};

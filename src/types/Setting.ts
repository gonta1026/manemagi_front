export type TSetting = {
  isUseLine: boolean;
  lineNoticeToken: string;
};

export type settingAndUser = {
  user: {
    id: number;
    name: string;
    setting: TSetting;
  };
};

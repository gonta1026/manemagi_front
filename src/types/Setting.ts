export type TSetting = {
  is_use_line: false;
  line_notice_token?: string | null;
};

export type settingAndUser = {
  user: {
    id: number | null;
    name: string | null;
    setting: TSetting;
  };
};

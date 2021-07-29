import { TLoadingAndErrorState } from './Common';

export type TSetting = {
  isUseLine: boolean;
  lineNoticeToken: string;
};

export type TSettingFormError = {
  isUseLine: string;
  lineNoticeToken: string;
};

export interface settingAndUser extends TLoadingAndErrorState {
  user: {
    id: number | null;
    name: string;
    setting: TSetting;
  };
}

import { TLoadingAndErrorState } from './common';
import { ResponseError } from './common';
import { NormalizeError } from '../modules/ApiClient';

export type TSetting = {
  id: number | null;
  isUseLine: boolean;
  lineNoticeToken: string;
};

export type TSettingFormik = Omit<TSetting, 'id'>;
export type TSettingFormError = Record<keyof TSettingFormik, string>;

export interface settingAndUser extends TLoadingAndErrorState {
  user: {
    id: number | null;
    name: string;
    email: string;
    setting: TSetting;
  };
}

export type ResponseFetchSetting =
  | {
      data: {
        email: string;
        id: number | null;
        name: string;
        setting: TSetting;
      };
      status: 'success';
    }
  | NormalizeError;

export type PayloadResponseCreateShop = {
  payload: ResponseFetchSetting | ResponseError;
};

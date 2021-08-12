import { TLoginedStorageKey } from '../modules/Auth';

export const storageKeys = {
  logined: 'logined',
  pageMoveNotice: 'pageMoveNotice',
} as const;

export const noticeStorageValues = {
  deleteShopping: 'deleteShopping',
  loginedNotice: 'loginedNotice',
  signUpedNotice: 'signUpedNotice',
  shoppingedNotice: 'shoppingedNotice',
  shoppingUpdatedNotice: 'shoppingUpdatedNotice',
  claimedNotice: 'claimedNotice',
  createdShopNotice: 'createdShopNotice',
} as const;

export type TLoginedStorageValue = {
  accessToken?: string;
  uid?: string;
  client?: string;
};

type TPageMoveNotice = typeof storageKeys.pageMoveNotice;
/* ！！重要！！ ここにローカルストレージで使うkeyを定義する事。何がローカルストレージで使われているかを管理するため */
type TStorageKey = TPageMoveNotice | TLoginedStorageKey;

export type TLocalStorage = {
  getStorageItem: (itemKey: TStorageKey) => string | null | undefined;
  setStorageItem: (itemKey: TStorageKey, value: any) => void;
  removeStorageItem: (itemKey: TStorageKey) => void;
};

class LocalStorage implements TLocalStorage {
  protected readonly localStorage;

  constructor() {
    if (process.browser && window.localStorage) {
      this.localStorage = window.localStorage;
    }
  }
  // NOTE キーを型で縛っているのでpublicで良い？
  public getStorageItem = (itemKey: TStorageKey) => {
    if (this.localStorage !== undefined) {
      return this.localStorage.getItem(itemKey);
    }
  };

  // NOTE キーを型で縛っているのでpublicで良い？
  public setStorageItem = (itemKey: TStorageKey, value: any) => {
    if (this.localStorage !== undefined) {
      this.localStorage.setItem(itemKey, value);
    }
  };

  public removeStorageItem = (itemKey: TStorageKey) => {
    if (this.localStorage !== undefined) {
      return this.localStorage.removeItem(itemKey);
    }
  };
}

export default LocalStorage;

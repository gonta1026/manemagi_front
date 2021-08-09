import { TLoginedStorageKey } from '../modules/Auth';

export const storageKeys = {
  logined: 'logined',
  pageMoveNotice: 'pageMoveNotice',
} as const;

export const noticeStorageValues = {
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
// NOTE ここにページ遷移後に使うお知らせに使用をする型をを追加する事。
type TPageMoveNoticeValue =
  | typeof noticeStorageValues.loginedNotice
  | typeof noticeStorageValues.shoppingedNotice
  | typeof noticeStorageValues.signUpedNotice
  | typeof noticeStorageValues.shoppingUpdatedNotice
  | typeof noticeStorageValues.claimedNotice
  | typeof noticeStorageValues.createdShopNotice;

export type TLocalStorage = {
  getStorageItem: (itemKey: TStorageKey) => string | null | undefined;
  setStorageItem: (itemKey: TStorageKey, value: any) => void;
  removeStorageItem: (itemKey: TStorageKey) => void;
};

class LocalStorage implements TLocalStorage {
  private localStorage;

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

  /* TODO 別クラス、もしくはmodulesに移動をしてに移動をさせる */
  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    if (this.localStorage !== undefined) {
      return this.setStorageItem(storageKeys.pageMoveNotice, targetNotice);
    }
  }

  /* TODO 別クラス、もしくはmodulesに移動をしてに移動をさせる */
  public afterPageMoveNotice(this: LocalStorage, callbackToastExecution: VoidFunction) {
    if (this.localStorage !== undefined) {
      const storageItem = this.getStorageItem(storageKeys.pageMoveNotice);
      if (storageItem) {
        callbackToastExecution();
        this.removeStorageItem(storageKeys.pageMoveNotice);
      }
    }
  }
}

export default LocalStorage;

/* TODO 仮でutilsフォルダーにに置いているが移動予定 */
import { isBooleanCheck } from '../utils/function';

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

type TLoginedStorageKeys = typeof storageKeys.logined;
type TPageMoveNotice = typeof storageKeys.pageMoveNotice;
/* ！！重要！！ ここにローカルストレージで使うkeyを定義する事。何がローカルストレージで使われているかを管理するため */
type TStorageKey = TPageMoveNotice | TLoginedStorageKeys;
// NOTE ここにページ遷移後に使うお知らせに使用をする型をを追加する事。
type TPageMoveNoticeValue =
  | typeof noticeStorageValues.loginedNotice
  | typeof noticeStorageValues.shoppingedNotice
  | typeof noticeStorageValues.signUpedNotice
  | typeof noticeStorageValues.shoppingUpdatedNotice
  | typeof noticeStorageValues.claimedNotice
  | typeof noticeStorageValues.createdShopNotice;

export type TLocalStorage = typeof LocalStorage;
class LocalStorage {
  private localStorage;

  constructor() {
    if (process.browser && window.localStorage) {
      this.localStorage = window.localStorage;
    }
  }
  // NOTE キーを型で縛っているのでpublicで良い？
  public getItem = (itemKey: TStorageKey) => {
    if (this.localStorage !== undefined) {
      return this.localStorage.getItem(itemKey);
    }
  };

  // NOTE キーを型で縛っているのでpublicで良い？
  public setItem = (itemKey: TStorageKey, value: any) => {
    if (this.localStorage !== undefined) {
      this.setItem(itemKey, value);
    }
  };

  public removeItem = (itemKey: TStorageKey) => {
    if (this.localStorage !== undefined) {
      return this.localStorage.removeItem(itemKey);
    }
  };

  public getLoginedStorageKeys() {
    if (this.localStorage !== undefined) {
      const loginedKeys = JSON.parse(
        this.localStorage.getItem(storageKeys.logined)!,
      ) as TLoginedStorageValue;
      return loginedKeys;
    }
  }
  /* NOTE ログイン時のstorageをセット */
  public setLoginedStorage(accessToken: string, client: string, uid: string) {
    if (this.localStorage !== undefined) {
      this.setItem(
        storageKeys.logined,
        JSON.stringify({
          accessToken,
          client,
          uid,
        }),
      );
    }
  }
  // TODO localstorageを扱っているのでこちらを作成しているが、Auth系のクラスを作成して対応した方が良さそう？
  public loginedStorageExists(): boolean {
    const loginedKeys = this.getLoginedStorageKeys();
    return isBooleanCheck(!!(loginedKeys?.uid && loginedKeys?.accessToken && loginedKeys?.client)); // !!で真偽値にして返す
  }
  // TODO localstorageを扱っているのでこちらを作成しているが、Auth系のクラスを作成して対応した方が良さそう？
  public removeLoginedStorage() {
    return this.removeItem(storageKeys.logined);
  }

  /* TODO 別クラス、もしくはmodulesに移動をしてに移動をさせる */
  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    if (this.localStorage !== undefined) {
      return this.setItem(storageKeys.pageMoveNotice, targetNotice);
    }
  }

  /* TODO 別クラス、もしくはmodulesに移動をしてに移動をさせる */
  public afterPageMoveNotice(this: LocalStorage, callbackToastExecution: VoidFunction) {
    if (this.localStorage !== undefined) {
      const storageItem = this.getItem(storageKeys.pageMoveNotice);
      if (storageItem) {
        callbackToastExecution();
        this.removeItem(storageKeys.pageMoveNotice);
      }
    }
  }
}

export default LocalStorage;

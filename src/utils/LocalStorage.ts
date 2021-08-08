import { isBooleanCheck } from '../utils/function';

type TLoginedStorageKey = 'loginedKeys';

export type TLoginedStorageValue = {
  accessToken?: string;
  uid?: string;
  client?: string;
};

type TPageMoveNotice = 'pageMoveNotice';
/* ！！重要！！ ここにローカルストレージで使うkeyを定義する事。何がローカルストレージで使われているかを管理するため */
type TStorageKey = TPageMoveNotice | TLoginedStorageKey;
// NOTE ここにページ遷移後に使うお知らせに使用をする型をを追加する事。
type TPageMoveNoticeValue =
  | typeof LocalStorage.noticeKeys.loginedNotice
  | typeof LocalStorage.noticeKeys.shoppingedNotice
  | typeof LocalStorage.noticeKeys.signUpedNotice
  | typeof LocalStorage.noticeKeys.shoppingUpdatedNotice
  | typeof LocalStorage.noticeKeys.claimedNotice
  | typeof LocalStorage.noticeKeys.createdShopNotice;

export type TLocalStorage = typeof LocalStorage;
class LocalStorage {
  private localStorage;

  constructor() {
    if (process.browser && window.localStorage) {
      this.localStorage = window.localStorage;
    }
  }

  public static noticeKeys = {
    loginedNotice: 'loginedNotice',
    signUpedNotice: 'signUpedNotice',
    shoppingedNotice: 'shoppingedNotice',
    shoppingUpdatedNotice: 'shoppingUpdatedNotice',
    claimedNotice: 'claimedNotice',
    createdShopNotice: 'createdShopNotice',
  } as const;

  public getLoginedStorageKeys() {
    if (this.localStorage !== undefined) {
      const loginedKeys = JSON.parse(
        this.localStorage.getItem('loginedKeys')!,
      ) as TLoginedStorageValue;
      return loginedKeys;
    }
  }

  public getItem = (itemKey: TStorageKey) => {
    if (this.localStorage !== undefined) {
      return this.localStorage.getItem(itemKey);
    }
  };

  public removeItem = (itemKey: TStorageKey) => {
    if (this.localStorage !== undefined) {
      return this.localStorage.removeItem(itemKey);
    }
  };

  // TODO localstorageを扱っているのでこちらを作成しているが、Auth系のクラスを作成して対応した方が良さそう？
  public loginedStorageExists(): boolean {
    const loginedKeys = this.getLoginedStorageKeys();
    return isBooleanCheck(!!(loginedKeys?.uid && loginedKeys?.accessToken && loginedKeys?.client)); // !!で真偽値にして返す
  }

  // TODO localstorageを扱っているのでこちらを作成しているが、Auth系のクラスを作成して対応した方が良さそう？
  public removeLoginedStorage() {
    return this.removeItem('loginedKeys');
  }

  /* NOTE ログイン時のstorageをセット */
  public setLoginedStorage(accessToken: string, client: string, uid: string) {
    if (this.localStorage !== undefined) {
      this.localStorage.setItem(
        'loginedKeys',
        JSON.stringify({
          accessToken,
          client,
          uid,
        }),
      );
    }
  }

  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    if (this.localStorage !== undefined) {
      return this.localStorage.setItem('pageMoveNotice', targetNotice);
    }
  }

  //NOTE ページ遷移後のtoastのお知らせで使用している。
  public afterPageMoveNotice(this: LocalStorage, callbackToastExecution: VoidFunction) {
    if (this.localStorage !== undefined) {
      const storageItem = this.localStorage.getItem('pageMoveNotice');
      if (storageItem) {
        callbackToastExecution();
        this.removeItem('pageMoveNotice');
      }
    }
  }
}

export default LocalStorage;

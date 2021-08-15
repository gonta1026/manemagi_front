export const noticeStorageKeys = {
  // ページ遷移をした後のtoastの表示に使用。ページ遷移前にセット、遷移後に削除
  pageMoveNotice: 'pageMoveNotice',
} as const;

export const authStorageKeys = {
  // ログインをした後のtokenの管理等に使用。全ページで使用。ログアウト時に削除される。
  logined: 'logined',
} as const;

export const storageKeys = {
  ...authStorageKeys,
  ...noticeStorageKeys,
} as const;

/* NOTE `TStorageKey` ここにローカルストレージで使うkeyを定義する事。何がローカルストレージで使われているかを管理するため */
type TStorageKey = keyof typeof storageKeys;

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

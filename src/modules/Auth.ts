import { isBooleanCheck } from '../utils/function';
import LocalStorage from '../modules/LocalStorage';

const localStorage = new LocalStorage();

const authStorageKeys = {
  logined: 'logined',
} as const;

type TLoginedStorageValue = {
  accessToken?: string;
  uid?: string;
  client?: string;
};

export type TLoginedStorageKey = typeof authStorageKeys.logined;
export type TLocalStorage = typeof LocalStorage;

class Auth {
  public getLoginedStorageKeys() {
    const loginedKeys = JSON.parse(
      localStorage.getStorageItem(authStorageKeys.logined)!,
    ) as TLoginedStorageValue;
    return loginedKeys;
  }
  /* NOTE ログイン時のstorageをセット */
  public setLoginedStorage(accessToken: string, client: string, uid: string) {
    console.log(accessToken);
    console.log(client);
    console.log(uid);
    localStorage.setStorageItem(
      authStorageKeys.logined,
      JSON.stringify({
        accessToken,
        client,
        uid,
      }),
    );
  }
  // TODO localstorageを扱っているのでこちらを作成しているが、Auth系のクラスを作成して対応した方が良さそう？
  public loginedStorageExists(): boolean {
    const loginedKeys = this.getLoginedStorageKeys();
    // console.log('loginedKeys', loginedKeys);
    return isBooleanCheck(!!(loginedKeys?.uid && loginedKeys?.accessToken && loginedKeys?.client)); // !!で真偽値にして返す
  }
  // TODO localstorageを扱っているのでこちらを作成しているが、Auth系のクラスを作成して対応した方が良さそう？
  public removeLoginedStorage() {
    return localStorage.removeStorageItem(authStorageKeys.logined);
  }
}

export default Auth;

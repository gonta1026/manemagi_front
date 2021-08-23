import { isBooleanCheck } from '../utils/function';
import LocalStorage, { authStorageKeys } from '../modules/LocalStorage';

const storage = new LocalStorage();
type TLoginedStorageValue = {
  accessToken?: string;
  uid?: string;
  client?: string;
};

class Auth {
  public getLoginedStorageKeys() {
    const loginedKeys: TLoginedStorageValue = JSON.parse(
      storage.getStorageItem(authStorageKeys.logined)!,
    );
    return loginedKeys;
  }
  public setLoginedStorage(accessToken: string, client: string, uid: string) {
    storage.setStorageItem(
      authStorageKeys.logined,
      JSON.stringify({
        accessToken,
        client,
        uid,
      }),
    );
  }
  public loginedStorageExists(): boolean {
    const loginedKeys = this.getLoginedStorageKeys();
    return isBooleanCheck(!!(loginedKeys?.uid && loginedKeys?.accessToken && loginedKeys?.client)); // !!で真偽値にして返す
  }
  public removeLoginedStorage() {
    storage.removeStorageItem(authStorageKeys.logined);
  }
}

export default Auth;

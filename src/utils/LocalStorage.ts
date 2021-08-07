type TPageMoveNotice = typeof LocalStorage.pageMoveNotice;
type TStorageKey = TPageMoveNotice;
type TSignUpedNotice = typeof LocalStorage.noticeKeys.signUpedNotice;
type TLoginedNotice = typeof LocalStorage.noticeKeys.loginedNotice;
type TShoppingedNotice = typeof LocalStorage.noticeKeys.shoppingedNotice;
type TShoppingUpdatedNotice = typeof LocalStorage.noticeKeys.shoppingUpdatedNotice;
type TClaimedNotice = typeof LocalStorage.noticeKeys.claimedNotice;
type TCreatedShop = typeof LocalStorage.noticeKeys.createdShopNotice;

// NOTE ここにページ遷移後に使うお知らせに使用をするキーを追加する。
type TPageMoveNoticeValue =
  | TLoginedNotice
  | TShoppingedNotice
  | TSignUpedNotice
  | TShoppingUpdatedNotice
  | TClaimedNotice
  | TCreatedShop;

class LocalStorage {
  private localStorage: Storage = window.localStorage;

  public static noticeKeys = {
    loginedNotice: 'loginedNotice',
    signUpedNotice: 'signUpedNotice',
    shoppingedNotice: 'shoppingedNotice',
    shoppingUpdatedNotice: 'shoppingUpdatedNotice',
    claimedNotice: 'claimedNotice',
    createdShopNotice: 'createdShopNotice',
  } as const;

  public static loginedKeys = {
    loginedNotice: 'loginedNotice',
    signUpedNotice: 'signUpedNotice',
    shoppingedNotice: 'shoppingedNotice',
    shoppingUpdatedNotice: 'shoppingUpdatedNotice',
    claimedNotice: 'claimedNotice',
    createdShopNotice: 'createdShopNotice',
  } as const;

  public getLoginedStorageKeys() {
    const { accessToken, client, uid } = localStorage;
    return { accessToken, client, uid };
  }

  public static pageMoveNotice = 'pageMoveNotice' as const;

  public getItem = (itemKey: TStorageKey) => this.localStorage.getItem(itemKey);

  public removeItem = (itemKey: TStorageKey) => this.localStorage.removeItem(itemKey);

  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    return this.localStorage.setItem(LocalStorage.pageMoveNotice, targetNotice);
  }

  public afterPageMoveNotice(this: LocalStorage, callbackToastExecution: VoidFunction) {
    const storageItem = this.localStorage.getItem(LocalStorage.pageMoveNotice);
    if (storageItem) {
      callbackToastExecution();
      this.removeItem(LocalStorage.pageMoveNotice);
    }
  }
}

export default LocalStorage;

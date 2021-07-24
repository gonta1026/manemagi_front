type TPageMoveNotice = typeof LocalStorage.pageMoveNotice;
type TStorageKey = TPageMoveNotice;
type TSignUpedNotice = typeof LocalStorage.noticeKey.signUpedNotice;
type TLoginedNotice = typeof LocalStorage.noticeKey.loginedNotice;
type TShoppingedNotice = typeof LocalStorage.noticeKey.shoppingedNotice;
type TShoppingUpdatedNotice = typeof LocalStorage.noticeKey.shoppingUpdatedNotice;
// NOTE ここにページ遷移後に使うお知らせに使用をするキーを追加する。
type TPageMoveNoticeValue =
  | TLoginedNotice
  | TShoppingedNotice
  | TSignUpedNotice
  | TShoppingUpdatedNotice;
class LocalStorage {
  private localStorage: Storage = window.localStorage;
  public static noticeKey = {
    loginedNotice: 'loginedNotice',
    signUpedNotice: 'signUpedNotice',
    shoppingedNotice: 'shoppingedNotice',
    shoppingUpdatedNotice: 'shoppingUpdatedNotice',
  } as const;
  public static pageMoveNotice = 'pageMoveNotice' as const;

  public getItem = (itemKey: TStorageKey) => this.localStorage.getItem(itemKey);

  public removeItem = (itemKey: TStorageKey) => this.localStorage.removeItem(itemKey);

  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    return this.localStorage.setItem(LocalStorage.pageMoveNotice, targetNotice);
  }

  public afterPageMoveNotice(
    this: LocalStorage,
    itemkey: TPageMoveNotice,
    callbackToastExecution: VoidFunction,
  ) {
    const storageItem = this.localStorage.getItem(itemkey);
    if (storageItem) {
      callbackToastExecution();
      this.removeItem(LocalStorage.pageMoveNotice);
    }
  }
}

export default LocalStorage;

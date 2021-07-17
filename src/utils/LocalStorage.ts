type TLoginedNoticeKey = 'loginedNotice';
type TOtherKey = 'otherType';
type TStorageKey = TLoginedNoticeKey | TOtherKey; // NOTE ここに使用をするキーを追加する。

class LocalStorage {
  private localStorage: Storage = window.localStorage;

  public getItem = (itemKey: TStorageKey) => this.localStorage.getItem(itemKey);

  public removeItem = (itemKey: TStorageKey) => this.localStorage.removeItem(itemKey);

  public setItemAtNotice(keyValue: { key: TStorageKey; noticeMessage: string }) {
    const { key, noticeMessage } = keyValue;
    return this.localStorage.setItem(key, noticeMessage);
  }

  public loginedNotice(this: LocalStorage, itemkey: TLoginedNoticeKey, callbackFunc: VoidFunction) {
    const storageItem = this.localStorage.getItem(itemkey);
    if (storageItem) {
      callbackFunc();
      this.removeItem(itemkey);
    }
  }
}

export default LocalStorage;

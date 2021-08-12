import LocalStorage, {
  storageKeys,
  noticeStorageValues,
  TPageMoveNoticeValue,
} from './LocalStorage';

class Notice extends LocalStorage {
  public getNoticeMessage(targetNotice: string) {
    let message = '';
    switch (targetNotice) {
      case noticeStorageValues.loginedNotice:
        message = 'ログインをしました！';
        break;
      case noticeStorageValues.signUpedNotice:
        message = '新規登録をしてログインしました！';
        break;
      case noticeStorageValues.shoppingedNotice:
        message = '買い物を登録しました！';
        break;
      case noticeStorageValues.claimedNotice:
        message = '請求を登録しました！';
        break;
      case noticeStorageValues.createdShopNotice:
        message = 'お店を登録しました！';
        break;
      case noticeStorageValues.shoppingUpdatedNotice:
        message = '買い物の更新をしました！';
        break;
    }
    return message;
  }

  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    if (this.localStorage !== undefined) {
      return this.setStorageItem(storageKeys.pageMoveNotice, targetNotice);
    }
  }

  public afterPageMoveNotice(this: Notice, callbackToastExecution: VoidFunction) {
    if (this.localStorage !== undefined) {
      const storageItem = this.getStorageItem(storageKeys.pageMoveNotice);
      if (storageItem) {
        callbackToastExecution();
        this.removeStorageItem(storageKeys.pageMoveNotice);
      }
    }
  }
}

export default Notice;

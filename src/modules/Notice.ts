import LocalStorage, { storageKeys } from './LocalStorage';

export const noticeStorageValues = {
  deleteShopping: 'deleteShopping',
  loginedNotice: 'loginedNotice',
  signUpedNotice: 'signUpedNotice',
  shoppingedNotice: 'shoppingedNotice',
  shoppingUpdatedNotice: 'shoppingUpdatedNotice',
  claimedNotice: 'claimedNotice',
  createdShopNotice: 'createdShopNotice',
} as const;

type TPageMoveNoticeValue = keyof typeof noticeStorageValues;

const storage = new LocalStorage();

class Notice {
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
      case noticeStorageValues.deleteShopping:
        message = '買い物を削除しました！';
        break;
    }
    return message;
  }

  public setItemAtPageMoveNotice(targetNotice: TPageMoveNoticeValue) {
    return storage.setStorageItem(storageKeys.pageMoveNotice, targetNotice);
  }

  public afterPageMoveNotice(this: Notice, callbackToastExecution: VoidFunction) {
    const storageItem = storage.getStorageItem(storageKeys.pageMoveNotice);
    if (storageItem) {
      callbackToastExecution();
      storage.removeStorageItem(storageKeys.pageMoveNotice);
    }
  }
}

export default new Notice();

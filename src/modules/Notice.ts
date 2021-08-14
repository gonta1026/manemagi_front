import LocalStorage, { storageKeys } from './LocalStorage';
import { ToastType } from '../customHook/useToastAction';

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
  private getTargetMessage(this: Notice, targetNotice: string) {
    let message = '';
    switch (targetNotice) {
      /* トップページ */
      case noticeStorageValues.loginedNotice:
        message = 'ログインをしました！';
        break;
      case noticeStorageValues.signUpedNotice:
        message = '新規登録をしてログインしました！';
        break;
      /* 買い物一覧 */
      case noticeStorageValues.shoppingedNotice:
        message = '買い物を登録しました！';
        break;
      case noticeStorageValues.deleteShopping:
        message = '買い物を削除しました！';
        break;
      /* 買い物詳細 */
      case noticeStorageValues.shoppingUpdatedNotice:
        message = '買い物の更新をしました！';
        break;
      /* 請求一覧 */
      case noticeStorageValues.claimedNotice:
        message = '請求を登録しました！';
        break;
      /* お店一覧 */
      case noticeStorageValues.createdShopNotice:
        message = 'お店を登録しました！';
        break;
    }
    return message;
  }

  public setItemAtPageMoveNotice(this: Notice, targetNotice: TPageMoveNoticeValue) {
    return storage.setStorageItem(storageKeys.pageMoveNotice, targetNotice);
  }

  private afterPageMoveNotice(this: Notice, callbackToastExecution: VoidFunction) {
    const storageItem = storage.getStorageItem(storageKeys.pageMoveNotice);
    if (storageItem) {
      callbackToastExecution();
      storage.removeStorageItem(storageKeys.pageMoveNotice);
    }
  }

  public pageMovedNotice(this: Notice, toastActions: ToastType) {
    const targetNotice = storage.getStorageItem(storageKeys.pageMoveNotice)!;
    const message = this.getTargetMessage(targetNotice);
    this.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  }
}

export default new Notice();

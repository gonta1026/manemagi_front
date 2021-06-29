// NOTE ひらがなの形式チェック
export const validHiragana = new RegExp(/^[ぁ-んー]*$/);
// NOTE 全角の形式チェック
export const validZenkaku = new RegExp(/^[^\x20-\x7e]*$/);
// NOTE 半角数字の形式チェック
export const validHankaku = new RegExp(/^[0-9]+$/);
// NOTE 半角英数字の形式チェック
export const validHankakuEngNum = new RegExp(/^[0-9a-zA-Z]+$/);
// NOTE 半角英数字記号の形式チェック
export const validHankakuEngNumSym = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/);
// NOTE telの形式チェック
export const validTel = new RegExp(/^0\d{9,10}$/);
// NOTE emailの形式チェック
export const validEmail = new RegExp(/^[a-z0-9]{1}[a-z0-9_.-]*@{1}[a-z0-9_.-]{1,}\.[a-z0-9]{1,}$/);
// NOTE 生年月日のチェック ex.1900-09-09
export const validBt = new RegExp(/[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9._-]+/);

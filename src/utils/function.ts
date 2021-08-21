/* オブジェクトの空チェック */
export const isEmpty = (obj: any) => !Object.keys(obj).length;

/* 三点リード */
export const ommisionText = (text: string | null, length = 10): string => {
  if (text === null) {
    return '';
  }
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

/* 金額のフォーマット */
export const formatPriceYen = (price: number | null): string => {
  if (price !== null) {
    return price.toLocaleString('ja-JP') + '円';
  }
  return '';
};

// typeScriptでうまく、shoppingとclaimでうまく型を制御したかったがうまくできなかったので一旦any[]で対応
/* 合計金額の算出 */
export const totalSumPrice = (targets: any[], key: 'price' | 'totalPrice'): number => {
  return targets.reduce((accumulator, shopping) => {
    return shopping[key] + accumulator;
  }, 0);
};
// typeScriptでうまく、shoppingとclaimでうまく型を制御したかったがうまくできなかったので一旦any[]で対応
/* 合計金額の算出 */
export const isBooleanCheck = (targetFormula: boolean): boolean => {
  let isValid = false;
  if (targetFormula) {
    isValid = true;
  }
  return isValid;
};

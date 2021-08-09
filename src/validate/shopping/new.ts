import { TShoppingForm, TShoppingFormError } from '../../types/Shopping';
import { SHOPPING_FORM } from '../../const/form/shopping';
import { validBlank, validMaxNum, validNum } from '../';

export const shoppingValidate = (values: TShoppingForm, errors: TShoppingFormError) => {
  const { PRICE, DATE, SHOP_ID, DESCRIPTION } = SHOPPING_FORM;
  const { MAX_300 } = validNum;

  /******************
   * 買い物金額
   ******************/
  if (validBlank.check(values.price)) {
    errors.price = validBlank.message(PRICE.LABEL);
  }
  /******************
   * 買い物日
   ******************/
  if (validBlank.check(values.date)) {
    errors.date = validBlank.message(DATE.LABEL);
  }
  /******************
   * お店
   ******************/
  if (validBlank.check(values.shopId)) {
    errors.shopId = validBlank.message(SHOP_ID.LABEL);
  }
  /******************
   * 説明
   ******************/
  if (validMaxNum.check(values.description, MAX_300)) {
    errors.description = validMaxNum.message(DESCRIPTION.LABEL, MAX_300);
  }
  return errors;
};

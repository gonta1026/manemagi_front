import { TShoppingForm, TShoppingFormError } from '../../types/Shopping';
import { SHOPPINGFORM } from '../../const/form/shopping';
import { validBlank } from '../';

export const shoppingValidate = (values: TShoppingForm, errors: TShoppingFormError) => {
  const { PRICE, DATE, SHOP_ID } = SHOPPINGFORM;

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
  return errors;
};

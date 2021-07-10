import { TShop } from '../../types/Shop';
import { SHOPFORM } from '../../const/form/shop';
import { validBlank } from '..';

export const registerShopValidate = (values: TShop, errors: TShop) => {
  const { NAME } = SHOPFORM;
  /******************
   * 店名もしくは場所
   ******************/
  if (validBlank.check(values.name)) {
    errors.name = validBlank.message(NAME.LABEL);
  }

  return errors;
};

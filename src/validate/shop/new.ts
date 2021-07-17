import { TShopForm } from '../../types/Shop';
import { SHOPFORM } from '../../const/form/shop';
import { validBlank, validRegisterdName } from '..';

export const shopNewValidate = (values: TShopForm, errors: TShopForm, shopNames: string[]) => {
  const { NAME } = SHOPFORM;
  /******************
   * 店名
   ******************/
  if (validBlank.check(values.name)) {
    errors.name = validBlank.message(NAME.LABEL);
  }
  if (validRegisterdName.check(values.name, shopNames)) {
    errors.name = validRegisterdName.message(values.name, NAME.LABEL);
  }

  return errors;
};

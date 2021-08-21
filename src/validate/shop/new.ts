import { TShopForm } from '../../model/shop';
import { SHOP_FORM } from '../../const/form/shop';
import { validBlank, validRegisterdName, validMaxNum, validNum } from '..';

export const shopNewValidate = (values: TShopForm, errors: TShopForm, shopNames: string[]) => {
  const { NAME, DESCRIPTION } = SHOP_FORM;
  const { MAX_50, MAX_300 } = validNum;
  /******************
   * 店名
   ******************/
  if (validBlank.check(values.name)) {
    errors.name = validBlank.message(NAME.LABEL);
  }
  if (validMaxNum.check(values.name, MAX_50)) {
    errors.name = validMaxNum.message(NAME.LABEL, MAX_50);
  }
  if (validRegisterdName.check(values.name, shopNames)) {
    errors.name = validRegisterdName.message(values.name, NAME.LABEL);
  }
  /******************
   * 説明
   ******************/
  if (validMaxNum.check(values.description, MAX_300)) {
    errors.description = validMaxNum.message(DESCRIPTION.LABEL, MAX_300);
  }
  return errors;
};

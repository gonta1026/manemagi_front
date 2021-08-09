import React from 'react';
import { BaseLink } from '../../../common/uiParts/atoms';
import { SETTING_FORM } from '../../../../const/form/setting';
import { page } from '../../../../pageMap';

const IsUseLineHelper = (): JSX.Element => {
  return (
    <>
      <BaseLink pathname={page.setting.edit.link()}>{`『${page.setting.edit.name()}』`}</BaseLink>の
      {SETTING_FORM.IS_USE_LINE.LABEL}がOFFになっています。
    </>
  );
};

export default IsUseLineHelper;

import React from 'react';
import { BaseLink } from '../../../common/uiParts/atoms';
import { SETTINGFORM } from '../../../../const/form/setting';
import { page } from '../../../../pageMap';

const IsUseLineHelper = (): JSX.Element => {
  return (
    <>
      <BaseLink pathname={page.setting.edit.link()}>{`『${page.setting.edit.name()}』`}</BaseLink>の
      {SETTINGFORM.IS_USE_LINE.LABEL}がOFFになっています。
    </>
  );
};

export default IsUseLineHelper;

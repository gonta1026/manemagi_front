import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerShop } from '../../reducks/services/Shop';
import { useDispatch } from 'react-redux';
import { SHOPFORM } from '../../const/form/shop';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
  BaseSwitch,
} from '../../components/common/uiParts/atoms';
import { registerShopValidate } from '../../validate/shop/register';
import { TShop } from '../../types/Shop';

const Settings = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(true);

  const dispatch = useDispatch();
  const validate = (values: TShop) => {
    let errors = {} as TShop;
    errors = registerShopValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TShop>({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: async (values) => {
      const { name, description } = values;
      const response: any = await dispatch(
        registerShop({
          name,
          description,
        }),
      );
      if (response.payload.status === 'success') {
        console.log('お店の登録完了!');
      }
    },
  });

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>LINE設定</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={SHOPFORM.NAME.ID}
          label={SHOPFORM.NAME.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        >
          {formik.errors.name && formik.touched.name && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.name}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <div className="base-vertical-item flex items-center">
          <BaseSwitch checked={checked} color={'primary'} onChange={handleSwitchChange} />
          <p className="ml-2">LINE通知{checked ? 'ON' : 'OFF'}</p>
        </div>

        <div className="base-vertical-item flex justify-center">
          <BaseButton
            color={'primary'}
            onClick={() => console.log('click')}
            type={'submit'}
            variant={'contained'}
          >
            更新
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Settings;

import React from 'react';
import { useFormik } from 'formik';
import { registerShop } from '../../reducks/services/Shop';
import { useDispatch } from 'react-redux';
import { SHOPFORM } from '../../const/form/shop';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField, LabelAndTextArea } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
} from '../../components/common/uiParts/atoms';
import { registerShopValidate } from '../../validate/shop/register';
import { TShop } from '../../types/Shop';
import useToastAction from '../../customHook/useToastAction';

const NewShop = (): JSX.Element => {
  const toastActions = useToastAction();
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

      console.log(response.payload.status);
      if (response.payload.status === 'SUCCESS') {
        const { handleToastOpen } = toastActions;
        handleToastOpen({
          message: `お店の${name}を登録しました！`,
          severity: 'success',
          autoHideDuration: 5000,
        });
      }
    },
  });

  return (
    <CommonWrapTemplate toastActions={toastActions}>
      <BasePageTitle className={'my-5'}>お店登録</BasePageTitle>
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

        <LabelAndTextArea
          wrapClass="base-vertical-item"
          id={SHOPFORM.DESCRIPTION.ID}
          label={SHOPFORM.DESCRIPTION.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />

        <div className="base-vertical-item flex justify-center">
          <BaseButton color={'primary'} type={'submit'} variant={'contained'}>
            登録
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default NewShop;

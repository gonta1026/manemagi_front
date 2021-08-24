import React from 'react';
import { BaseFormControlLabel } from '../..';

type TProps = {
  control: JSX.Element;
  label: string;
};

const LabelAndCheckBox = ({ control, label }: TProps): JSX.Element => {
  return <BaseFormControlLabel {...{ control, label }} />;
};

export default LabelAndCheckBox;

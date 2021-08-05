import React from 'react';
import { BaseFormControlLabel } from '../../uiParts/atoms';

type TProps = {
  control: JSX.Element;
  label: string;
};

const LabelAndCheckBox = ({ control, label }: TProps) => {
  return <BaseFormControlLabel {...{ control, label }} />;
};

export default LabelAndCheckBox;

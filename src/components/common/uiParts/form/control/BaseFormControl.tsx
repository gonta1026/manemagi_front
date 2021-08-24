import React, { ReactNode } from 'react';
import { FormControl } from '@material-ui/core';

const BaseFormControl = ({ children, id }: { children: ReactNode; id: string }): JSX.Element => {
  return <FormControl {...{ id }}>{children}</FormControl>;
};

export default BaseFormControl;

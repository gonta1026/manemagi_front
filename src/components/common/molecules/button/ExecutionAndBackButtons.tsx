import { BaseButton, BaseLink } from '../../uiParts/atoms';

import React from 'react';
type TProps = {
  className?: string;
  backPathname: string;
  backButtonName: string;
  disabledExecution?: boolean;
  nextPathname?: string;
  nextButtonName: string;
};

const ExecutionAndBackButtons = ({
  className = '',
  backPathname,
  backButtonName,
  disabledExecution,
  nextPathname,
  nextButtonName,
}: TProps) => {
  return (
    <>
      <div className={className + ' flex justify-center'}>
        {nextPathname ? (
          <BaseLink pathname={nextPathname}>
            <BaseButton>{nextButtonName}</BaseButton>
          </BaseLink>
        ) : (
          <BaseButton disabled={disabledExecution} type={'submit'}>
            {nextButtonName}
          </BaseButton>
        )}
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <BaseLink pathname={backPathname}>
          <BaseButton>{backButtonName}</BaseButton>
        </BaseLink>
      </div>
    </>
  );
};

export default ExecutionAndBackButtons;

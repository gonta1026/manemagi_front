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
            <BaseButton color={'primary'} variant={'contained'}>
              {nextButtonName}
            </BaseButton>
          </BaseLink>
        ) : (
          <BaseButton
            color={'primary'}
            disabled={disabledExecution}
            type={'submit'}
            variant={'contained'}
          >
            {nextButtonName}
          </BaseButton>
        )}
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <BaseLink pathname={backPathname}>
          <BaseButton color={'secondary'} variant={'contained'}>
            {backButtonName}
          </BaseButton>
        </BaseLink>
      </div>
    </>
  );
};

export default ExecutionAndBackButtons;

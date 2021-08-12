import { BaseButton, BaseLinkButton } from '../../uiParts';
import { TIconType } from '../../uiParts/button/BaseSwitchIcon';

import React from 'react';
type TProps = {
  className?: string;
  backPathname: string;
  backName: string;
  disabledExecution?: boolean;
  nextPathname?: string;
  nextName: string;
  nextCustomType?: TIconType;
  backCustomType?: TIconType;
};

const ExecutionAndBackButtons = ({
  className = '',
  backPathname,
  backName,
  disabledExecution,
  nextPathname,
  nextName,
  nextCustomType = 'normal',
  backCustomType = 'arrowBack',
}: TProps) => {
  return (
    <>
      <div className={className + ' flex justify-center'}>
        {nextPathname ? (
          <BaseLinkButton customType={nextCustomType} pathname={nextPathname}>
            {nextName}
          </BaseLinkButton>
        ) : (
          <BaseButton disabled={disabledExecution} type={'submit'} customType={nextCustomType}>
            {nextName}
          </BaseButton>
        )}
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <BaseLinkButton customType={backCustomType} pathname={backPathname}>
          {backName}
        </BaseLinkButton>
      </div>
    </>
  );
};

export default ExecutionAndBackButtons;

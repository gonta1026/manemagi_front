import { useEffect, useState } from 'react';

const useIsAfterSsr = (): boolean => {
  const [isAfterSsr, setIsAfterSsr] = useState<boolean>(false);

  useEffect(() => {
    if (process.browser) {
      setIsAfterSsr(true);
    }
  }, []);
  return isAfterSsr;
};

export default useIsAfterSsr;

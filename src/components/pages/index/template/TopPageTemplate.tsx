import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettingAndUser } from '../../../../reducks/services/Setting';
import { BaseHeader, Drawer } from '../../../common/organisms';
import { BaseToast } from '../../../common/molecules';
import { useRouter } from 'next/router';
import { ToastType } from '../../../../customHook/useToastAction';
/* types */
import { settingAndUser } from '../../../../types/Setting';
const TopPageTemplate = ({
  children,
  toastActions,
}: {
  children: ReactNode;
  toastActions?: ToastType;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const storageExists = (): boolean => {
    let flag = false;
    if (
      localStorage.getItem('uid') &&
      localStorage.getItem('accessToken') &&
      localStorage.getItem('client')
    ) {
      flag = true;
    }
    return flag;
  };

  // Auth系のclassのところに処理を持ってくる。
  const isLogindCheck = () => {
    const perimitPages = ['/signup', '/login', '/'];
    const perimitPageExists = perimitPages.find((pageName) => pageName === router.pathname);
    if (
      // pages以外のところでトークンがなかったらログインページに飛ばす。
      !perimitPageExists &&
      !storageExists()
    ) {
      router.push('/login');
    }
  };

  useEffect(() => {
    isLogindCheck();
    if (storageExists()) {
      dispatch(fetchSettingAndUser());
    }
  }, []);

  return (
    <>
      {toastActions && <BaseToast {...toastActions} />}
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseHeader {...{ toggleDrawer, settingState }} />
      {children}
    </>
  );
};

export default TopPageTemplate;

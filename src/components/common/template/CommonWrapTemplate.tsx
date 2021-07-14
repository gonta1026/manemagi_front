import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSettingAndUser } from '../../../reducks/services/Setting';
import { BaseContainer } from '../uiParts/layout';
import { BaseHeader, Drawer } from '../organisms';
import { BaseToast } from '../molecules';
import { useRouter } from 'next/router';
import { ToastType } from '../../../customHook/useToastAction';

const CommonWrapTemplate = ({
  children,
  toastActions,
}: {
  children: ReactNode;
  toastActions?: ToastType;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
      <BaseHeader toggleDrawer={toggleDrawer} />
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseContainer>{children}</BaseContainer>
    </>
  );
};

export default CommonWrapTemplate;

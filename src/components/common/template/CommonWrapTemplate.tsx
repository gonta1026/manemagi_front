import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
/* BaseContainer */
import { BaseContainer } from '../uiParts/layout';
/* organisms */
import { BaseHeader, Drawer } from '../organisms';
/* molecules */
import { BaseToast } from '../molecules';
/* customHook */
import { ToastType } from '../../../customHook/useToastAction';
/* reducks */
import { fetchSettingAndUser } from '../../../reducks/services/Setting';
/* types */
import { settingAndUser } from '../../../types/Setting';

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
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

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
      <BaseHeader
        toggleDrawer={toggleDrawer}
        settingState={settingState}
        className={'sticky z-10 top-0'}
      />
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseContainer>{children}</BaseContainer>
    </>
  );
};

export default CommonWrapTemplate;

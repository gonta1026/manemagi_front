import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettingAndUser } from '../../../../reducks/services/Setting';
import { BaseHeader, BaseSidebar } from '../../../common/organisms';
import { BaseToast } from '../../../common/uiParts';
import { useRouter } from 'next/router';
import { ToastType } from '../../../../customHook/useToastAction';
/* types */
import { settingAndUser } from '../../../../types/Setting';
/* modules */
import Auth from '../../../../modules/Auth';
const TopPageTemplate = ({
  children,
  toastActions,
}: {
  children: ReactNode;
  toastActions?: ToastType;
}) => {
  const auth = new Auth();
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

  // Auth系のclassのところに処理を持ってくる。
  const isLogindPerimitCheck = () => {
    const perimitPages = ['/signup', '/login', '/'];
    const perimitPageExists = perimitPages.find((pageName) => pageName === router.pathname);
    if (
      // pages以外のところでトークンがなかったらログインページに飛ばす。
      !perimitPageExists &&
      !auth.loginedStorageExists()
    ) {
      router.push('/login');
    }
  };

  useEffect(() => {
    isLogindPerimitCheck();
    if (auth.loginedStorageExists()) {
      dispatch(fetchSettingAndUser());
    }
  }, []);

  return (
    <>
      {toastActions && <BaseToast {...toastActions} />}
      <BaseSidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseHeader {...{ toggleDrawer, settingState }} />
      {children}
    </>
  );
};

export default TopPageTemplate;

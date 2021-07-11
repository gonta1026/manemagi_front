import React, { ReactNode, useEffect, useState } from 'react';
import { BaseContainer } from '../uiParts/layout';
import { BaseHeader, Drawer } from '../organisms';
import { useRouter } from 'next/router';

const CommonWrapTemplate = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // Auth系のclassのところに処理を持ってくる。
  const isLogindCheck = () => {
    const pages = ['/signup', '/login', '/'];
    const isCurrentPageCheck = pages.some((pageName) => pageName === router.pathname);
    if (
      !isCurrentPageCheck &&
      // localStorageの扱いもAuth系のクラスで処理を変更予定。
      !localStorage.getItem('uid') &&
      !localStorage.getItem('accessToken') &&
      !localStorage.getItem('client')
    ) {
      router.push('/login');
    }
  };

  useEffect(() => {
    isLogindCheck();
  }, []);

  return (
    <>
      <BaseHeader toggleDrawer={toggleDrawer} />
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseContainer>{children}</BaseContainer>
    </>
  );
};

export default CommonWrapTemplate;

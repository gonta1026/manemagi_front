import React, { ReactNode } from 'react';
import { BaseContainer } from '../uiParts/layout';
import useIsAfterSsr from '../../../customHook/useIsAfterSsr';
import { BaseHeader, Drawer } from '../organisms';
import { useRouter } from 'next/router';

const CommonWrapTemplate = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isAfterSsr = useIsAfterSsr();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const pages = ['/signup', '/login', '/'];
  const isDisplayAtLogined = () => {
    if (isAfterSsr) {
      console.log('router', router.pathname);
      const noLoginedArrowPages = pages.filter((pageName) => pageName === router.pathname);
      if (
        // TODO ローカルストレージの処理は後に別箇所に移動させる。
        // TODO // でたらめなtoken等をセットされた時にデータは取れないが画面にはいけてしまうのは問題な気もするのでできれば対応をしたい。。
        localStorage.getItem('uid') &&
        localStorage.getItem('accessToken') &&
        localStorage.getItem('client') &&
        noLoginedArrowPages.length > 0
      ) {
        return true;
      } else {
        router.push('/');
        return false;
      }
    }
  };

  return (
    <>
      {isDisplayAtLogined() && (
        <>
          <BaseHeader toggleDrawer={toggleDrawer} />
          <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
          <BaseContainer>{children}</BaseContainer>
        </>
      )}
    </>
  );
};

export default CommonWrapTemplate;

import React, { ReactNode } from 'react';
import { BaseContainer } from '../uiParts/layout';
import { BaseHeader, Drawer } from '../organisms';

const CommonWrapTemplate = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <BaseHeader toggleDrawer={toggleDrawer} />
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <BaseContainer>{children}</BaseContainer>
    </>
  );
};

export default CommonWrapTemplate;

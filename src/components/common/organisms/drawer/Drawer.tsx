import React from 'react';
import { drawerLinks } from '../../../../pageMap';
import { materialStyles } from '../../../../styles/js/material';
import {
  BaseIcon,
  BaseLink,
  BaseList,
  BaseListItem,
  BaseListItemText,
  BaseDrawer,
} from '../../uiParts/atoms';
type TProps = {
  className?: string;
  toggleDrawer: any;
  isDrawerOpen: boolean;
};
const Drawer = ({ className = '', toggleDrawer, isDrawerOpen }: TProps) => {
  const classes = materialStyles({
    list: {
      width: 250,
    },
    childLink: {
      paddingLeft: 35,
    },
  });
  return (
    <BaseDrawer className={className} open={isDrawerOpen} onClose={toggleDrawer}>
      <div className={classes.list} role="presentation">
        <BaseList>
          {drawerLinks.map((page, index) => (
            <BaseListItem key={index} className={page.icon && index !== 0 ? 'border-t-2' : ''}>
              <BaseLink pathname={page.link} className={'w-full'}>
                <div className="flex items-center">
                  {page.icon && <BaseIcon icon={page.icon} />}
                  <BaseListItemText
                    primary={page.name}
                    className={!page.icon ? classes.childLink : ''}
                  />
                </div>
              </BaseLink>
            </BaseListItem>
          ))}
        </BaseList>
      </div>
    </BaseDrawer>
  );
};
export default Drawer;

import React from 'react';
import { useRouter } from 'next/router';
/* components */
import {
  BaseIcon,
  BaseLink,
  BaseList,
  BaseListItem,
  BaseListItemText,
  BaseDrawer,
} from '../../uiParts';
/* pageMap */
import { drawerLinks } from '../../../../pageMap';
/* styles */
import { materialStyles } from '../../../../styles/js/material';

type TProps = {
  className?: string;
  toggleDrawer: any;
  isDrawerOpen: boolean;
};

const Drawer = ({ className = '', toggleDrawer, isDrawerOpen }: TProps): JSX.Element => {
  const router = useRouter();
  const classNames = {
    list: {
      width: 250,
    },
    childLink: {
      paddingLeft: 35,
    },
  };
  const classes = materialStyles(classNames) as Record<keyof typeof classNames, string>;

  return (
    <BaseDrawer className={className} open={isDrawerOpen} onClose={toggleDrawer}>
      <div className={classes.list} role="presentation">
        <BaseList>
          {drawerLinks.map((page, index) => (
            <BaseListItem
              key={index}
              className={page.icon && index !== 0 ? 'border-t-2' : ''}
              selected={page.link === router.pathname}
            >
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

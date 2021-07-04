import React from 'react';
import { pageMap } from '../../../../pageMap';
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
          {pageMap.map((page, index) => (
            <BaseLink pathname={page.link} key={index}>
              <BaseListItem>
                {page.icon && <BaseIcon icon={page.icon} />}
                <BaseListItemText
                  primary={page.name}
                  className={!page.icon ? classes.childLink : ''}
                />
              </BaseListItem>
            </BaseLink>
          ))}
        </BaseList>
      </div>
    </BaseDrawer>
  );
};
export default Drawer;

import React from 'react';
import { ListItemText } from '@material-ui/core/';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BaseIcon, BaseLink, BaseList, BaseListItem, BaseDrawer } from '../../uiParts/atoms';
import { pageMap } from '../../../../pageMap';

const Drawer = ({
  className = '',
  toggleDrawer,
  isDrawerOpen,
}: {
  className?: string;
  toggleDrawer: any;
  isDrawerOpen: boolean;
}) => {
  const classes = makeStyles(() =>
    createStyles({
      list: {
        width: 250,
      },
      childLink: {
        paddingLeft: 35,
      },
    }),
  )();

  return (
    <BaseDrawer className={className} open={isDrawerOpen} onClose={toggleDrawer}>
      <div className={classes.list} role="presentation">
        <BaseList>
          {pageMap.map((page, index) => (
            <BaseLink pathname={page.link} key={index}>
              <BaseListItem>
                {page.icon && <BaseIcon icon={page.icon} />}
                <ListItemText primary={page.name} className={!page.icon ? classes.childLink : ''} />
              </BaseListItem>
            </BaseLink>
          ))}
        </BaseList>
      </div>
    </BaseDrawer>
  );
};

export default Drawer;

import React from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { ListItem, ListItemText } from '@material-ui/core/';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BaseIcon, BaseLink } from '../../uiParts/atoms';
import { pageMap } from '../../../../pageMap';

const BaseDrawer = ({
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
    <Drawer anchor={'left'} open={isDrawerOpen} onClose={toggleDrawer(false)} className={className}>
      <div className={classes.list} role="presentation">
        <List>
          {pageMap.map((page, index) => (
            <BaseLink pathname={page.link} key={index}>
              <ListItem button>
                {page.icon && <BaseIcon icon={page.icon} />}
                <ListItemText primary={page.name} className={!page.icon ? classes.childLink : ''} />
              </ListItem>
            </BaseLink>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default BaseDrawer;

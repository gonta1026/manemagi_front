import React from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { ListItem, ListItemText } from '@material-ui/core/';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BaseIcon, BaseLink } from '../../uiParts/atoms';
import { TIcon } from '../../uiParts/atoms/icon/BaseIcon';
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
        paddingLeft: 51,
      },
    }),
  )();

  return (
    <Drawer anchor={'left'} open={isDrawerOpen} onClose={toggleDrawer(false)} className={className}>
      <div className={classes.list} role="presentation">
        <List>
          {pageMap.map((page, index) => (
            <BaseLink pathname={page.link} query={page.query} key={index}>
              <ListItem button>
                <BaseIcon icon={page.icon as TIcon} />
                <ListItemText primary={page.name} />
              </ListItem>
              {page.childLinks?.map(
                (childLink, secondIndex) =>
                  childLink && (
                    <BaseLink pathname={childLink.link} key={secondIndex}>
                      <ListItem button className={classes.childLink}>
                        <ListItemText primary={childLink.name} />
                      </ListItem>
                    </BaseLink>
                  ),
              )}
            </BaseLink>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default BaseDrawer;

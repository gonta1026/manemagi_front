import React from 'react';
/* styles */
import { materialStyles } from '../../../../styles/js/material';

const LineNotice = ({ isLineNotice }: { isLineNotice: boolean }): JSX.Element => {
  let badgeClass = {};
  if (isLineNotice) {
    badgeClass = {
      backgroundColor: '#16c464',
      color: '#fff',
    };
  } else {
    badgeClass = {
      backgroundColor: '#ddd',
      color: '#gray',
    };
  }
  const classes = materialStyles({
    badge: {
      fontSize: '13px',
      padding: '3px 7px',
      borderRadius: '20px',
      ...badgeClass,
    },
  });

  return <div className={classes.badge}>{isLineNotice ? 'LINE通知済' : 'LINE未通知'}</div>;
};

export default LineNotice;

import React from 'react';
/* styles */
import { materialStyles } from '../../../../styles/js/material';
import { COLORS } from '../../../../const/color';

const LineNotice = ({
  isLineNotice,
  text,
}: {
  isLineNotice: boolean;
  text: string;
}): JSX.Element => {
  let badgeClass = {};
  if (isLineNotice) {
    badgeClass = {
      backgroundColor: COLORS.LINE,
      color: '#fff',
    };
  } else {
    badgeClass = {
      backgroundColor: '#ddd',
      color: '#gray',
    };
  }

  const classNames = {
    badge: {
      fontSize: '13px',
      padding: '3px 7px',
      borderRadius: '20px',
      ...badgeClass,
    },
  };
  const classes = materialStyles(classNames) as Record<keyof typeof classNames, string>;

  return <div className={classes.badge}>{text}</div>;
};

export default LineNotice;

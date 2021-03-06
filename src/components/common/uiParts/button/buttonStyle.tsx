import { blue, red, green, orange } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TIconType } from './BaseSwitchIcon';

export const buttonStyle = (
  theme: Theme,
  buttonType: TIconType,
  variant: 'contained' | 'outlined' | 'text',
): any => {
  let styles = {};
  switch (buttonType) {
    case 'normal':
    case 'arrowBack':
    case 'addCircleOutline':
      if (variant === 'outlined') {
        styles = {
          color: blue[500],
          backgroundColor: 'transparent',
          border: `1px solid ${blue[500]}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        };
      } else if (variant === 'contained') {
        styles = {
          color: theme.palette.getContrastText(blue[700]),
          backgroundColor: blue[700],
          '&:hover': {
            backgroundColor: blue[700],
          },
        };
      }
      break;
    case 'description':
      if (variant === 'outlined') {
        styles = {
          color: blue[500],
          backgroundColor: 'transparent',
          border: `1px solid ${blue[500]}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        };
      } else if (variant === 'contained') {
        styles = {
          color: theme.palette.getContrastText(blue[500]),
          backgroundColor: blue[500],
          '&:hover': {
            backgroundColor: blue[500],
          },
        };
      }
      break;
    case 'receipt':
      if (variant === 'outlined') {
        styles = {
          color: orange[500],
          backgroundColor: 'transparent',
          border: `1px solid ${orange[500]}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        };
      } else if (variant === 'contained') {
        styles = {
          color: theme.palette.getContrastText(orange[500]),
          backgroundColor: orange[500],
          '&:hover': {
            backgroundColor: orange[500],
          },
        };
      }
      break;
    case 'edit':
    case 'update':
      if (variant === 'outlined') {
        styles = {
          color: green[500],
          backgroundColor: 'transparent',
          border: `1px solid ${green[500]}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        };
      } else if (variant === 'contained') {
        styles = {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[500],
          },
        };
      }
      break;
    case 'delete':
      if (variant === 'outlined') {
        styles = {
          color: red[500],
          backgroundColor: 'transparent',
          border: `1px solid ${red[500]}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        };
      } else if (variant === 'contained') {
        styles = {
          color: theme.palette.getContrastText(red[500]),
          backgroundColor: red[500],
          '&:hover': {
            backgroundColor: red[500],
          },
        };
      }
      break;
    case 'search':
      if (variant === 'outlined') {
        styles = {
          color: green[500],
          backgroundColor: 'transparent',
          border: `1px solid ${green[500]}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        };
      } else if (variant === 'contained') {
        styles = {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[500],
          },
        };
      }
      break;
    case '':
      styles = {};
      break;
  }
  return styles;
};

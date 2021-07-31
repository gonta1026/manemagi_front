import { blue, yellow, red, green, lightGreen } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TIconType } from './BaseSwitchIcon';

export const buttonStyle = (theme: Theme, buttonType: TIconType): any => {
  switch (buttonType) {
    case 'normal':
      return {
        color: theme.palette.getContrastText(blue[700]),
        backgroundColor: blue[700],
        '&:hover': {
          backgroundColor: blue[700],
        },
      };
    case 'update':
      return {
        color: '#fff',
        backgroundColor: yellow[700],
        '&:hover': {
          backgroundColor: yellow[700],
        },
      };
    case 'delete':
      return {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[700],
        },
      };
    case 'arrowBack':
      return {
        color: theme.palette.getContrastText(lightGreen[700]),
        backgroundColor: lightGreen[700],
        '&:hover': {
          backgroundColor: lightGreen[700],
        },
      };
    case 'search':
      return {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        '&:hover': {
          backgroundColor: green[700],
        },
      };
  }
};

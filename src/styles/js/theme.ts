import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 35,
      },
    },
    MuiListItem: {
      root: {
        paddingTop: 6,
        paddingBottom: 6,
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: '#ffee58',
      },
    },
    MuiDialog: {
      paper: {
        margin: 5,
      },
      paperFullWidth: {
        '@media (max-width: 768px)': {
          maxWidth: 500,
        },
      },
    },
    MuiSnackbar: {
      anchorOriginTopRight: {
        top: 5,
        '@media (min-width: 600px)': {
          top: 8,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        minWidth: 200,
      },
      input: {
        padding: '10.5px 14px',
      },
    },
  },
  palette: {
    primary: {
      main: '#226cd6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;

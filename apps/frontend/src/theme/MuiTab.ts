import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material';

export const MuiTab: Components<Theme>['MuiTab'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
        borderTopLeftRadius: theme.spacing(1.25),
        borderTopRightRadius: theme.spacing(1.25),
      },
    }),
  },
};

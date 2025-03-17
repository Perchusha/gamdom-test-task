import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material';

export const MuiTabs: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderBottom: `1.5px solid ${theme.palette.divider}`,
    }),
    indicator: ({ theme }) => ({
      border: 'none',
      height: 2,
      borderRadius: theme.spacing(0.5),
    }),
  },
};

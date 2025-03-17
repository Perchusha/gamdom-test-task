import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: () => ({
      textWrap: 'nowrap',
      overflow: 'hidden',
    }),
  },
};

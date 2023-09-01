import {createTheme} from '@mui/material/styles';

const customColors = {
    primary: {
        main: '#5932EA',
    },
    secondary: {
        main: '#860f84',
    },
};

const theme = createTheme({
    palette: {
        primary: customColors.primary,
        secondary: customColors.secondary,
    },
});

export default theme;
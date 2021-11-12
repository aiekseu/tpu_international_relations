import {createTheme, responsiveFontSizes} from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(205,240,170,0.61)'
        }
    }
});
theme = responsiveFontSizes(theme);

export default theme
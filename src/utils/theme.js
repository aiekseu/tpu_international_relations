import {createTheme, responsiveFontSizes} from "@material-ui/core";

let theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(79,162,0,0.88)'
        }
    }
});
theme = responsiveFontSizes(theme);

export default theme
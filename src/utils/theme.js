import {createTheme, responsiveFontSizes} from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: '#69BC00',
        },
        success: {
            main: '#69BC00'
        },
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    padding: 0,
                    paddingLeft: 8,
                },
                input: {
                    fontSize: '0.95rem'
                }
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    ".MuiAutocomplete-root &:not(.MuiInputLabel-shrink)": {
                        transform: "translate(14px, 7.5px) scale(1)"
                    },
                    fontSize: '0.95rem'
                }
            }
        },
    },
});
theme = responsiveFontSizes(theme);

export default theme
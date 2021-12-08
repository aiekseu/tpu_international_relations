import React from 'react';
import {CssBaseline, ThemeProvider, Typography, useMediaQuery,} from "@mui/material";
import theme from "./utils/theme";
import Header from "./components/header";
import Agreements from "./panels/agreementsSec";
import KPIs from "./panels/kpiSec";
import EditData from "./panels/editSec";

const App = () => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        isMobile // если пользователь зашел с устроства с маленьким экраном - извиняемся и ничего не показываем
            ? <div style={{textAlign: 'center', marginTop: 80}}>
                <Typography variant='h5'>
                    Международные связи ТПУ<br/><br/>
                </Typography>
                <Typography>
                    Мобильная версия находится в разработке
                </Typography>
            </div>
            : <>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Header/>
                    {/* Секции лендинга из ../panels */}
                    <KPIs/>
                    <Agreements/>
                    <EditData />
                </ThemeProvider>
            </>
    )

};

export default App
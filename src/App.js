import React from 'react';
import {CssBaseline, ThemeProvider,} from "@mui/material";
import theme from "./utils/theme";
import Header from "./components/header";
import Agreements from "./panels/agreementsSec";
import KPIs from "./panels/kpiSec";
import RootStore from "./stores/rootStore";

// const classes = {
//     root: {
//         flexGrow: 1,
//     },
//
// }

const App = () => {

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header />
                <KPIs />
                <Agreements/>
                {/*    <main>*/}
                {/*        <div className={classes.content}>*/}
                {/*            <Container maxWidth="lg">*/}
                {/*                <Grid container direction='column' alignItems='center'>*/}
                {/*                    <Typography variant='h4' className={classes.sectionTitle}>*/}
                {/*                        Статистика*/}
                {/*                    </Typography>*/}
                {/*                    <ButtonGroup variant="text" size='large' color="black" fullWidth>*/}
                {/*                        <Button*/}
                {/*                            onClick={() => setActiveCard('country')}*/}
                {/*                            className={activeCard === 'country' ? classes.activeSectionName : classes.inactiveSectionName}*/}
                {/*                        >*/}
                {/*                            По странам*/}
                {/*                        </Button>*/}
                {/*                        <Button*/}
                {/*                            onClick={() => setActiveCard('representative')}*/}
                {/*                            className={activeCard === 'representative' ? classes.activeSectionName : classes.inactiveSectionName}*/}
                {/*                        >*/}
                {/*                            По ключевым людям*/}
                {/*                        </Button>*/}
                {/*                        <Button*/}
                {/*                            onClick={() => setActiveCard('agreement')}*/}
                {/*                            className={activeCard === 'agreement' ? classes.activeSectionName : classes.inactiveSectionName}*/}
                {/*                        >*/}
                {/*                            По типам договоров*/}
                {/*                        </Button>*/}
                {/*                    </ButtonGroup>*/}
                {/*                </Grid>*/}

                {/*                <div className={classes.statisticCard}>*/}
                {/*                    {getStatisticCard(activeCard)}*/}
                {/*                </div>*/}
                {/*            </Container>*/}
                {/*        </div>*/}
                {/*    </main>*/}
            </ThemeProvider>
        </>
    )

};

export default App
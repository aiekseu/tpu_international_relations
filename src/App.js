import React from 'react';
import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import theme from "./utils/theme";
import Header from "./components/header";
import Agreements from "./panels/agreementsSec";
// import {
//     AppBar,
//     Button,
//     ButtonGroup,
//     Container,
//     CssBaseline,
//     Grid,
//     IconButton, ThemeProvider,
//     Toolbar,
//     Typography
// } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import AroundAgreementType from "./panels/old/AroundAgreementType";
// import AroundCountry from "./panels/old/AroundCountry";
// import AroundRepresentative from "./panels/old/AroundRepresentative";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },
//     content: {
//         padding: theme.spacing(8, 0, 6),
//     },
//     sectionTitle: {
//         marginLeft: 'auto',
//         marginRight: 'auto',
//     },
//     inactiveSectionName: {
//         color: '#323232'
//     },
//     activeSectionName: {
//         fontWeight: 'bolder',
//         color: '#323232'
//     },
//     statisticCard: {
//         marginTop: 24
//     }
// }));

const classes = {
    root: {
        flexGrow: 1,
    },
    upperAppBar: {
        color: 'black',
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center"
    },
    upperAppBarDate: {
        color: 'white',
        marginRight: theme.spacing(12),
    },
    upperAppBarScheduleLink: {
        color: 'white',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'black',
        fontWeight: 500
    },
    content: {
        padding: theme.spacing(8, 0, 6),
    },
    sectionTitle: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    inactiveSectionName: {
        color: '#323232'
    },
    activeSectionName: {
        fontWeight: 'bolder',
        color: '#323232'
    },
    statisticCard: {
        marginTop: 24
    }
}

const App = () => {

    // const classes = useStyles()
    // const [activeCard, setActiveCard] = useState('representative')
    //
    // const getStatisticCard = (activeCard) => {
    //     switch (activeCard) {
    //         case 'country': {
    //             return <AroundCountry/>
    //         }
    //         case 'agreement': {
    //             return <AroundAgreementType/>
    //         }
    //         case 'representative': {
    //             return <AroundRepresentative/>
    //         }
    //         default: {
    //             return <AroundCountry/>
    //         }
    //     }
    // }



    return (

        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header />
                <Agreements />
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
        </React.Fragment>
    )

};

export default App
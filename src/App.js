import React, {useState} from 'react';
import {
    AppBar,
    Button,
    ButtonGroup,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    MuiThemeProvider,
    responsiveFontSizes,
    Toolbar,
    Typography
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AroundAgreementType from "./panels/AroundAgreementType";
import AroundCountry from "./panels/AroundCountry";
import AroundRepresentative from "./panels/AroundRepresentative";


let theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(79,162,0,0.88)'
        }
    }
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
}));

const App = () => {

    const classes = useStyles()
    const [activeCard, setActiveCard] = useState('representative')

    const getStatisticCard = (activeCard) => {
        switch (activeCard) {
            case 'country': {
                return <AroundCountry/>
            }
            case 'agreement': {
                return <AroundAgreementType/>
            }
            case 'representative': {
                return <AroundRepresentative/>
            }
            default: {
                return <AroundCountry/>
            }
        }
    }

    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Международные связи ТПУ
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.content}>
                        <Container maxWidth="lg">
                            <Grid container direction='column' alignItems='center'>
                                <Typography variant='h4' className={classes.sectionTitle}>
                                    Статистика
                                </Typography>
                                <ButtonGroup variant="text" size='large' color="black" fullWidth>
                                    <Button
                                        onClick={() => setActiveCard('country')}
                                        className={activeCard === 'country' ? classes.activeSectionName : classes.inactiveSectionName}
                                    >
                                        По странам
                                    </Button>
                                    <Button
                                        onClick={() => setActiveCard('representative')}
                                        className={activeCard === 'representative' ? classes.activeSectionName : classes.inactiveSectionName}
                                    >
                                        По ключевым людям
                                    </Button>
                                    <Button
                                        onClick={() => setActiveCard('agreement')}
                                        className={activeCard === 'agreement' ? classes.activeSectionName : classes.inactiveSectionName}
                                    >
                                        По типам договоров
                                    </Button>
                                </ButtonGroup>
                            </Grid>

                            <div className={classes.statisticCard}>
                                {getStatisticCard(activeCard)}
                            </div>
                        </Container>
                    </div>
                </main>
            </MuiThemeProvider>
        </React.Fragment>
    )

};

export default App
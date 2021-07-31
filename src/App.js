import React from 'react';
import {AppBar, Button, Container, CssBaseline, IconButton, Toolbar, Typography, Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import AroundCountry from "./components/AroundCountry";


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
    sectionName: {
        margin: 24
    },
    statisticCard: {
        height: '70vh',
        maxHeight: '80%',
        borderRadius: 6,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: 16,
            paddingRight: 0,
        },
    },
}));

const App = () => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color='#6FA53B'>
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
                        <Typography variant='h4' className={classes.sectionName}>
                            Статистика по странам
                        </Typography>
                        <Paper className={classes.statisticCard} elevation={2}>
                            <AroundCountry/>
                        </Paper>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    )

};

export default App
import React from "react";
import {AppBar, Button, Container, Grid, IconButton, Link, Toolbar, Typography} from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import tpuDarkIcon from "../images/tpuDarkLogo.svg";
import navigationLine from '../images/navigationLine.svg'
import navigationDotActive from '../images/navigationDotActive.svg'
import navigationDotInactive from '../images/navigationDotInactive.svg'

import theme from "../utils/theme";

const classes = {
    root: {
        flexGrow: 1,
    },
    upperAppBar: {
        paddingLeft: 0,
        color: 'black',
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
    },
    upperAppBarDate: {
        color: 'white',
        marginRight: theme.spacing(12),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(2),
        },
        paddingLeft: 0
    },
    upperAppBarScheduleLink: {
        color: 'white',
        flexGrow: 1,
    },
    upperAppBarSearchButton: {
        marginRight: theme.spacing(2),
        color: 'white',
    },
    upperAppBarLanguageButton: {
        marginRight: theme.spacing(2),
        color: 'white'
    },
    upperAppBarAuthorizeButton: {
        color: 'white',
    },
    upperAppBarAuthorizeText: {
        color: 'white',
        lineHeight: '1.1',
        textAlign: 'right',
        fontSize: '0.85rem',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'black',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '1.45rem'
    },
    navigationLine: {
        position: 'relative',
        marginLeft: 12
    },
    navigationDot1: {
        position: 'absolute',
        top: '12px',
        right: '21px',
    },
    navigationDot2: {
        position: 'absolute',
        top: '36px',
        right: '21px',
    },
    navigationDot3: {
        position: 'absolute',
        top: '60px',
        right: '21px',
    },
    currentSection: {
        textAlign: 'right'
    }
}

const Header = () => {

    return (
        <AppBar position="static" elevation={0}>
            <Container maxWidth={window.innerWidth} sx={classes.upperAppBar} style={{padding: 0}}>
                <Container maxWidth='lg'>
                    <Toolbar variant='dense'>
                        <Typography sx={classes.upperAppBarDate} variant='subtitle2'>
                            1 ноября 2021, четная неделя
                        </Typography>
                        <Typography sx={classes.upperAppBarScheduleLink} variant='subtitle2'>
                            <CalendarTodayIcon sx={{fontSize: '0.95rem'}}/> Расписание
                        </Typography>
                        <IconButton sx={classes.upperAppBarSearchButton}>
                            <SearchIcon/>
                        </IconButton>
                        <Link sx={classes.upperAppBarLanguageButton}>
                            En
                        </Link>
                        <IconButton sx={classes.upperAppBarAuthorizeButton}>
                            <AccountCircleOutlinedIcon/>
                        </IconButton>
                        <Typography sx={classes.upperAppBarAuthorizeText}>
                            Авторизоваться<br/>как сотрудник
                        </Typography>
                    </Toolbar>
                </Container>
            </Container>
            <Container maxWidth='lg'>
                <Toolbar>
                    <img src={tpuDarkIcon} style={classes.menuButton} alt="ТПУ"/>
                    <Typography sx={classes.title}>
                        Международные связи ТПУ
                    </Typography>
                    <div>
                        <Grid container direction='column' sx={classes.currentSection}>
                            <Grid item>
                                <Typography>
                                    статистика
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    поиск договоров
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    новости
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <img src={navigationLine} style={classes.navigationLine} alt="ТПУ"/>
                    <div>
                        <Grid container direction='column' sx={classes.currentSection}>
                            <Grid item>
                                <img src={navigationDotActive} style={classes.navigationDot1}  alt="ТПУ"/>
                            </Grid>
                            <Grid item>
                                <img src={navigationDotInactive} style={classes.navigationDot2} alt="ТПУ"/>
                            </Grid>
                            <Grid item>
                                <img src={navigationDotInactive} style={classes.navigationDot3} alt="ТПУ"/>
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
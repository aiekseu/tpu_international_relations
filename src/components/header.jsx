import React from "react";
import {AppBar, Container, IconButton, Link, Toolbar, Typography} from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import tpuDarkIcon from "../images/tpuDarkLogo.png";

import theme from "../utils/theme";

import {observer} from "mobx-react-lite";
import rootStore from "../stores/rootStore";

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
    logo: {
        marginRight: theme.spacing(12),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(2),
        },
        paddingLeft: 0,
        height: 32
    },
    upperAppBarDate: {
        color: 'white',
        marginRight: theme.spacing(12),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(1),
        },
        paddingLeft: 0
    },
    upperAppBarScheduleLink: {
        color: 'white',
        flexGrow: 1,
        [theme.breakpoints.down('lg')]: {
            display: 'none'
        },
    },
    upperAppBarSearchButton: {
        marginRight: theme.spacing(2),
        color: 'white',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
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
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'pre-line'
    },
    appBar: {
        backgroundColor: 'transparent',
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

const Header = observer(() => {

    return (
        <AppBar position="static" elevation={0} style={{backgroundColor: 'rgba(205,240,170,0.61)'}}>
            {/* Верхний (черный) аппбар */}
            <Container sx={classes.upperAppBar} style={{padding: 0, maxWidth: '100%'}}>
                <Container maxWidth='lg'>
                    <Toolbar variant='dense'>
                        <img src={tpuDarkIcon} style={classes.logo} alt="ТПУ"/>
                        <Typography sx={classes.upperAppBarDate} variant='subtitle2'>
                            {rootStore.globalDataStore.todayDate}
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
                        <IconButton sx={classes.upperAppBarAuthorizeButton} onClick={() => {
                            rootStore.globalDataStore.authorize()
                        }}>
                            <AccountCircleOutlinedIcon/>
                        </IconButton>
                        <Typography sx={classes.upperAppBarAuthorizeText} onClick={() => {
                            rootStore.globalDataStore.authorize()
                        }}>
                            {rootStore.globalDataStore.isAuthorized
                                ? 'Выйти'
                                : `Авторизоваться 
                                как сотрудник`
                            }
                        </Typography>
                    </Toolbar>
                </Container>
            </Container>

            {/* Нижний (зеленый) аппбар */}
            {/*<Container maxWidth='lg' sx={classes.appBar}>*/}
            {/*    <Toolbar>*/}
            {/*        <img src={tpuDarkIcon} style={classes.logo} alt="ТПУ"/>*/}
            {/*        <Typography sx={classes.title}>*/}
            {/*            Международные связи ТПУ*/}
            {/*        </Typography>*/}
            {/*        <div>*/}
            {/*            <Grid container direction='column' sx={classes.currentSection}>*/}
            {/*                <Grid item>*/}
            {/*                    <Typography>*/}
            {/*                        статистика*/}
            {/*                    </Typography>*/}
            {/*                </Grid>*/}
            {/*                <Grid item>*/}
            {/*                    <Typography>*/}
            {/*                        поиск договоров*/}
            {/*                    </Typography>*/}
            {/*                </Grid>*/}
            {/*                <Grid item>*/}
            {/*                    <Typography>*/}
            {/*                        новости*/}
            {/*                    </Typography>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </div>*/}
            {/*        <img src={navigationLine} style={classes.navigationLine} alt="ТПУ"/>*/}
            {/*        <div>*/}
            {/*            <Grid container direction='column' sx={classes.currentSection}>*/}
            {/*                <Grid item>*/}
            {/*                    <img src={navigationDotActive} style={classes.navigationDot1}  alt="ТПУ"/>*/}
            {/*                </Grid>*/}
            {/*                <Grid item>*/}
            {/*                    <img src={navigationDotInactive} style={classes.navigationDot2} alt="ТПУ"/>*/}
            {/*                </Grid>*/}
            {/*                <Grid item>*/}
            {/*                    <img src={navigationDotInactive} style={classes.navigationDot3} alt="ТПУ"/>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </div>*/}
            {/*    </Toolbar>*/}
            {/*</Container>*/}
        </AppBar>
    );
})

export default Header;
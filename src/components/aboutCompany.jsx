import React from 'react';
import {
    IconButton,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import {LoadingButton, Skeleton} from "@mui/lab";

import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

import styled from "@emotion/styled";
import theme from "../utils/theme";

import CloseIcon from '@mui/icons-material/Close';

import rootStore from '../stores/rootStore'

// Кнопка "поиск"
const SearchButton = styled(LoadingButton)(({theme}) => ({
    borderRadius: 10,
    borderColor: theme.palette.success.main,
    borderWidth: 2,
    padding: 5,
    textTransform: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: '#5B5B5B',
    boxShadow: "0px 0px 2px 0px rgba(50, 86, 52, 0.6)",
    '&:hover': {
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        boxShadow: "0px 0px 5px 0px rgba(50, 106, 52, 0.6)",
    },
    marginTop: '12px',
    marginBottom: '16px',
}));

const windowHeight = window.innerHeight;

const classes = {
    root: {
        width: 340,
        height: windowHeight * 0.6,
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 4,
        paddingRight: 4,
        display: 'flex',
    },
    title: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 600,
        fontSize: '1.125rem',
        marginBottom: 1.5,
    },
    closeButton: {
        position: 'absolute',
        top: 14,
        right: 12.5,
        padding: 0.5,
    },
    skeleton: {
        margin: 0.5,
        borderRadius: 0.5,
    }
}

const AboutCompany = observer(() => {

    return (
        <Paper
            elevation={3}
            sx={classes.root}
            // style={{
            //     visibility: rootStore.aboutCompanyStore.isOpen ? 'visible' : 'hidden',
            // }}
        >
            <Stack direction='column' style={{width: '100%'}}>
                <Typography sx={classes.title}>
                    Информация о компании
                </Typography>

                <IconButton
                    sx={classes.closeButton}
                    onClick={() => {
                        rootStore.aboutCompanyStore.openOrCloseAboutCompanyPanel()
                    }}
                >
                    <CloseIcon style={{fontSize: '1.4rem'}}/>
                </IconButton>

                {/* Картинка */}

                <Typography sx={classes.title}>
                    История отношений
                </Typography>

                {
                    (rootStore.aboutCompanyStore.company)
                        ? <div>
                            {rootStore.aboutCompanyStore.company.name}
                        </div>
                        : <Skeleton variant='rectangular' height={150} sx={classes.skeleton}/>

                }

            </Stack>
        </Paper>
    )
})


export default AboutCompany
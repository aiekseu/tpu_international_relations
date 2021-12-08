import React from 'react';
import {IconButton, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import CloseIcon from '@mui/icons-material/Close';
import rootStore from '../stores/rootStore'
import TableB from "./tableB";
import CompanyData from "./old/CompanyData";
const windowHeight = window.innerHeight;

const classes = {
    root: {
        width: 1000,
        maxHeight: windowHeight * 0.6,
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
        marginBottom: 0,
    },
    companyName: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 1,
        fontWeight: 400,
        fontSize: '0.9rem',
        textAlign: 'center'
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
    },
    historyTitle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0,
        marginTop: 1,
        fontWeight: 600,
        fontSize: '1.125rem',
    },
}

const CompanyTable = observer(() => {

    return (
        <Paper
            elevation={3}
            sx={classes.root}
        >
            <Stack direction='column' style={{width: '100%'}}>
                <Typography sx={classes.title}>
                    Информация о компании
                </Typography>


                {
                    (rootStore.aboutCompanyStore.company)
                        ?
                        <Typography sx={classes.companyName}>
                            {rootStore.aboutCompanyStore.company.name}
                        </Typography>
                        :
                        <Skeleton variant='rectangular' height={40} sx={classes.skeleton}/>
                }


                <IconButton
                    sx={classes.closeButton}
                    onClick={() => {
                        rootStore.aboutCompanyStore.openOrCloseAboutCompanyPanel()
                    }}
                >
                    <CloseIcon style={{fontSize: '1.4rem'}}/>
                </IconButton>
                <TableB/>
            </Stack>
        </Paper>
    )
})


export default CompanyTable
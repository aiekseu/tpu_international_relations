import React from 'react';
import {
    IconButton,
    Paper,
    Stack, Tooltip,
    Typography
} from "@mui/material";
import {LoadingButton, Skeleton} from "@mui/lab";

import {observer} from "mobx-react-lite";

import styled from "@emotion/styled";

import CloseIcon from '@mui/icons-material/Close';

import rootStore from '../stores/rootStore'
import {Chart} from "react-google-charts";
import {Pie, ResponsiveContainer} from "recharts";
import {PieChart} from "@mui/icons-material";
import MyPieChart from "./pieChart";

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

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];


const AboutCompany = observer(() => {

    return (
        <Paper
            elevation={3}
            sx={classes.root}
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

                <MyPieChart/>

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
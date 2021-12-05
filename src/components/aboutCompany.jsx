import React from 'react';
import {IconButton, Paper, Skeleton, Stack, Typography} from "@mui/material";

import {observer} from "mobx-react-lite";


import CloseIcon from '@mui/icons-material/Close';

import rootStore from '../stores/rootStore'
import MyPieChart from "./pieChart";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";

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
    timeline: {
        padding: 0
    },
    timeLineAgrType: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.3
    },
    timeLineAgrDate: {
        fontWeight: 300,
        fontSize: '0.75rem',
        color: '#707070'
    }
}

const CompanyTimeline = observer(() => {

    return (
        <Timeline position="right" sx={classes.timeline}>
            {rootStore.aboutCompanyStore.timeLineData.map((agrState, index) => {
                    return (
                        <TimelineItem key={agrState.id_agreement}>
                            <TimelineSeparator>
                                <TimelineConnector/>
                                <TimelineDot color={agrState.is_valid ? 'success' : 'error'}/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineOppositeContent style={{display: 'none'}}/>
                            <TimelineContent sx={{py: '12px', px: 2}}>
                                <Typography sx={classes.timeLineAgrType}>
                                    {agrState.agr_type_name}
                                </Typography>
                                <Typography sx={classes.timeLineAgrDate}>{agrState.end_date ?? 'Неизвестная дата'}</Typography>
                            </TimelineContent>
                        </TimelineItem>)
                }
            )}
        </Timeline>
    )
})

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


                {
                    (rootStore.aboutCompanyStore.company)
                        ?
                        <Typography sx={classes.companyName}>
                            {rootStore.aboutCompanyStore.company.name}
                        </Typography>
                        : <Skeleton variant='rectangular' height={40} sx={classes.skeleton}/>
                }


                <IconButton
                    sx={classes.closeButton}
                    onClick={() => {
                        rootStore.aboutCompanyStore.openOrCloseAboutCompanyPanel()
                    }}
                >
                    <CloseIcon style={{fontSize: '1.4rem'}}/>
                </IconButton>

                <MyPieChart/>

                <Typography sx={classes.historyTitle}>
                    История отношений
                </Typography>

                {
                    (rootStore.aboutCompanyStore.company)
                        ?
                        <div
                            style={{
                                overflow: 'scroll',
                                overflowY: 'scroll',
                                overflowX: 'none',
                            }}
                        >
                            <CompanyTimeline/>
                        </div>
                        : <Skeleton variant='rectangular' height={150} sx={classes.skeleton}/>

                }

            </Stack>
        </Paper>
    )
})


export default AboutCompany
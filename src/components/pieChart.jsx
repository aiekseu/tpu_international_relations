import React from 'react';
import {Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import rootStore from "../stores/rootStore";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {Paper, Skeleton, Typography} from "@mui/material";

const classes = {
    tooltip: {
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 0.5,
        paddingBottom: 0.5
    },
    pieChart: {
        marginBottom: 25,
        marginTop: 25
    },
    skeleton: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

// Тултип при наведении на сектор диаграммы
const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <Paper elevation={3} sx={classes.tooltip}>
                <Typography>{payload[0].name} : {payload[0].value} шт. </Typography>
            </Paper>
        );
    }
    return null;
};

// Смещенный лейбл сектора диаграммы (цифра с кол-вом договоров)
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            {rootStore.aboutCompanyStore.pieChartData[index].value}
        </text>
    );
};


const MyPieChart = () => {
    return (
        rootStore.aboutCompanyStore.isFetching
            ? <Skeleton variant="circular" width={105} height={105} style={classes.skeleton}/>
            : <ResponsiveContainer width="100%" height={105} style={classes.pieChart}>
                <PieChart >
                    <Pie
                        data={toJS(rootStore.aboutCompanyStore.pieChartData)}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={50}
                        fill="#82ca9d"
                        paddingAngle={2}
                        label={renderCustomizedLabel}
                        labelLine={false}
                        animationDuration={600}
                    />
                    <Tooltip
                        content={CustomTooltip}
                    />
                </PieChart>
            </ResponsiveContainer>

    )
}

export default observer(MyPieChart)
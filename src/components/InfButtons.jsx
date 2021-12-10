import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';

import TableChartIcon from '@mui/icons-material/TableChart';
import PieChartIcon from '@mui/icons-material/PieChart';

import rootStore from "../stores/rootStore";


const InfButtons = () => {
    const [aboutCompanyInfoType, setAboutCompanyInfoType] = React.useState("pieChart");

    const handleAlignment = (event, newType) => {
        if (newType != null) {
            setAboutCompanyInfoType(newType);
            rootStore.aboutCompanyStore.changeIsCardChosen()
        }
    };

    return (
        <ToggleButtonGroup
            color="standard"
            exclusive
            value={aboutCompanyInfoType}
            onChange={handleAlignment}
            style={{position: "absolute", right: 100, top: 48 }}
        >
            <ToggleButton value="table">
                <TableChartIcon/> {aboutCompanyInfoType === 'table' ? '' : ' Таблица'}
            </ToggleButton>
            <ToggleButton value="pieChart">
                <PieChartIcon/> {aboutCompanyInfoType === 'pieChart' ? '' : ' Карточка'}
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default InfButtons
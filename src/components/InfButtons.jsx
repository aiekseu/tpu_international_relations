import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import rootStore from "../stores/rootStore";


const InfButtons = () => {
    const [alignment, setAlignment] = React.useState("pieChart");

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment != null) {
            setAlignment(newAlignment);
            rootStore.aboutCompanyStore.changeIsCardChosen()
        }
    };

    return (
        <ToggleButtonGroup
            color="standard"
            exclusive
            value={alignment}
            onChange={handleAlignment}
            style={{position: "absolute", right: 100, top: 48 }}
        >
            <ToggleButton value="table">
                <ViewListIcon/>
            </ToggleButton>
            <ToggleButton value="pieChart">
                <ViewQuiltIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default InfButtons
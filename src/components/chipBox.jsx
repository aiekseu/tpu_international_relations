import {Chip, Grid, Grow} from "@mui/material";

const ChipBox = ({text, onDelete}) => {
    if (text.trim() !== "") return (
        <Grow in={(text.trim() !== "")}
              orientation="vertical"
        >
            <Grid item>
                <Chip label={text} variant="outlined" onDelete={onDelete}/>
            </Grid>
        </Grow>
    )
    else
        return null
}

export default ChipBox
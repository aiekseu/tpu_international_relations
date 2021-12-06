import {Chip, Grid, Grow} from "@mui/material";

const ChipBox = ({text, f}) => {
    let t = false
    if ((text !== "") && (text !== " ")) {
        t = true
    }
    if (t) return (
        <Grow in={t}
              orientation="vertical"
        >
            <Grid item>
                <Chip label={text} variant="outlined" onDelete={f}/>
            </Grid>
        </Grow>
    )
    else
        return null
}

export default ChipBox
import {Container} from "@mui/material";
import rootStore from "../stores/rootStore";

const classes = {
    chip:{
        border: "1px solid #69BC00",
        borderRadius:"33px",
        transitionDuration: "200ms",
        "&:hover":{
            cursor: "pointer",
            backgroundColor: "rgba(100,120,100,0.25)"
        },
    }

}



const Chip = ({text, f}) =>{

    if (text !== "") return (<Container sx={classes.chip} onClick={f}>
        {text}
    </Container>)
    else return (<></>)
}

export default Chip
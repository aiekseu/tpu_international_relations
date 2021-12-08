import {Chip, Grid, Paper, Typography,} from "@mui/material";
import background1 from "../images/bg_1.png"
import background2 from "../images/bg_2.png"


const classes = {
    headContainer: {
        height: "200px",
    },
    head: {
        marginTop: "70px",
        marginLeft: "3%",
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: '3.5rem',
        color: '#55802B',
        textShadow: '0px 4px 22px rgba(68, 94, 111, 0.1)',
    },
    mainContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        width: "100%",
    },
    container: {
        marginLeft: "1%",
        marginRight: "1%",
    },
    background: {
        objectFit: "cover",
        objectPosition: "top",
        position: "absolute",
        zIndex: "-10",
        width: "100%",
        height: "500px",
        bottom: "0",
    },
    newbox: {
        backgroundColor: "white",
        height: "300px",
        width: "600px",
    }
}

const News = () => {
    return (
        <>
            <Grid sx={classes.headContainer}
                  container
                  direction="row"
            >
                <Grid item sx={classes.head}>
                    Новости
                </Grid>
            </Grid>

            <div style={classes.mainContainer}>
                <Newsbox></Newsbox>

                <img style={classes.background} src={background1} alt={"background1"}/>
                <img style={classes.background} src={background2} alt={"background2"}/>
            </div>
        </>
    )
}

const Newsbox = () => {
    return (
        <>
            <Paper sx={classes.newbox}></Paper>
        </>
    )
}
export default News
import {Container, Paper, Stack, Typography} from "@mui/material";

const classes = {
    card: {
        display: "flex",
        justifyItems: "center",
        alignContent: "center",
        height: '84px',
        background: 'rgba(255, 255, 255, 0.65)',
        boxShadow: '0px 4px 32px rgba(0, 114, 188, 0.2)',
        borderRadius: '10px',
    },
    text: {
        overflowWrap: "break-word",
        color: "#163C55",
        marginRight: "4px",
        whiteSpace: "unset",
        wordBreak: "normal",
        display: "flex",
        alignItems: "center",
        height: "100%",
        lineHeight: "22px",
        padding: "10px",
        textAlign: "left"
    },
    value: {
        fontStyle: "normal",
        color: "rgba(23, 61, 85, 0.7)",
        fontWeight: "500",
        marginLeft: "10px",
        marginRight: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: '3.125rem',
        height: '100%',
    },
    img: {
        top: "50%",
        transform: "translateY(-50%)",
        position: "absolute",
        right: "50%",
        marginRight: "-25%",
        height: "150px",
        zIndex: "-1",
        transitionDuration: "200ms",
        opacity: "0.25",
    },
    KPI: {
        position: "relative",
        transitionDuration: '200ms',
        textAlign: 'center',
        "&:hover": {
            transform: "scale(1.25)",
        },
    },
}
const KPI = ({background, value, text}) => {
    return (
        <Container sx={classes.KPI}>
            <Paper sx={classes.card} variant="contained">
                <Stack direction="row">
                    <Typography style={classes.value}>{value} </Typography>
                    <Typography style={classes.text}> {text} </Typography>
                </Stack>
            </Paper>
            <img style={classes.img} src={background}/>
        </Container>
    )
}
export default KPI
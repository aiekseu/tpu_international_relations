import {Container, Grid, Paper} from "@mui/material";
import background1 from "../images/Vector.png"
import background2 from "../images/Vector1.png"
import icon from "../images/icon (2).svg"
import icon1 from "../images/icon (1).svg"
import icon2 from "../images/icon (3).svg"
import icon3 from "../images/icon (4).svg"
import GlobalDataStore from "../stores/globalDataStore";
import {observer} from "mobx-react-lite";


const classes = {
    headContainer: {
        height: "400px",
    },
    headhead: {
        margin: "7%"
    },
    H: {
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: '67px',
        color: '#55802B',
        textShadow: '0px 4px 22px rgba(68, 94, 111, 0.1)',
    },
    mainContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        width: "100%",

    },
    container: {
        margin: "7%",
    },
    card: {
        display: "inline-flex",
        justifyItems: "center",
        alignContent: "center",
        height: '84px',

        background: 'rgba(255, 255, 255, 0.65)',
        boxShadow: '0px 4px 32px rgba(0, 114, 188, 0.2)',
        borderRadius: '10px',
    },
    text: {
        color: "#163C55",
        fontFamily: 'Montserrat, sans-serif',
        marginRight: "4px",
        whiteSpace: "pre",
        display: "flex",
        alignItems: "center",
        height: "100%",
        fontSize: "18px",
        lineHeight: "22px",
        padding: "10px",
    },
    value: {
        fontStyle: "normal",
        color: "rgba(23, 61, 85, 0.7)",
        fontWeight: "500",
        marginLeft: "10px",
        marginRight: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: '3.5rem',
        height: '100%',
    },
    background: {
        objectFit: "cover",
        objectPosition: "top",
        position: "absolute",
        zIndex: "-10",
        width: "100%",
        height: "400px",
        bottom: "0",
    },
    KPI: {
        position: "relative",
        padding: 0,
        transitionDuration: '200ms',
        textAlign: 'center',
        "&:hover": {
            transform: "scale(1.25)",
            padding: "0",
            "img": {
                opacity: "0.7",
            }
        },
    },
    img: {
        top: "50%",
        transform: "translateY(-50%)",
        position: "absolute",
        right: "50%",
        marginRight: "-25%",
        height: "150px",
        zIndex: "-1",
        opacity: "0.25",
        transitionDuration: "200ms",
    },
}

function VValidator(value, str1, str2, str3) {
    let lastDigit = value % 10;
    if ((lastDigit === 0) || (lastDigit > 4)) {
        return str1;//прим. "0 стран"
    }
    if (lastDigit === 1) {
        return str2;//прим. "1 страна"
    }
    if (lastDigit < 5) {
        return str3;//прим. "2 страны"
    }
    return ("Error in VValidator")
}

const globalData = new GlobalDataStore();

const KPIs = () => {

    // useEffect(() => {
    //     api.get('/countries/')
    //         .then((response) => {
    //             setCountries(response.data.length)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })
    // })

    return (
        <div>
            <Grid sx={classes.headContainer}
                  container
                  direction="row"
            >
                <Grid item sx={classes.headhead}>
                    <h1 style={classes.H}>Томский политех сегодня - это:</h1>
                </Grid>
            </Grid>

            <div style={classes.mainContainer}>
                <Grid
                    container
                    sx={classes.container}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                >
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon}
                            value={globalData.countriesList.length}
                            text={"стран" + VValidator(globalData.countriesList.length, "", "а", "ы") + ", с которыми\nзаключены договоры"}
                        />
                    </Grid>
                    <Grid item md={6} lg={3} style={{padding: 0}}>
                        <KPI
                            background={icon1}
                            value={136}
                            text={"университет" + VValidator(136, "ов", "", "а") + "-\nпартнеров"}
                        />
                    </Grid>
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon2}
                            value={22}
                            text={"международные\nколлаборации"}
                        />

                    </Grid>
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon3}
                            value={453}
                            text={"совместные\nисследования"}
                        />
                    </Grid>
                </Grid>

                <img style={classes.background} src={background1} alt='bg1'/>
                <img style={classes.background} src={background2} alt='bg2'/>
            </div>
        </div>
    )
}


const KPI = ({background, value, text}) => {
    return (
        <Container sx={classes.KPI} >
            <Paper sx={classes.card} variant="contained">
                <div style={classes.value} >{value} </div>
                <div style={classes.text}> {text} </div>
            </Paper>
            <img style={classes.img} src={background} alt='kpiBg'/>
        </Container>
    )
}

export default observer(KPIs)
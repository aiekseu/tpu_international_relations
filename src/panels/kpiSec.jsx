import {Container, Grid,} from "@mui/material";
import background1 from "../images/Vector.png"
import background2 from "../images/Vector1.png"
import icon from "../images/icon (2).svg"
import icon1 from "../images/icon (1).svg"
import icon2 from "../images/icon (3).svg"
import icon3 from "../images/icon (4).svg"
import GlobalData from "../stores/globalDataStore";
import {observer} from "mobx-react-lite";
import KPI from "../components/KPI";
import Chip from "../components/chip";
import rootStore from "../stores/rootStore";


const classes = {
    headContainer: {
        height: "360px",
    },
    head: {
        marginTop: "5%",
        marginLeft: "3%",
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: '4rem',
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
        marginLeft: "1%",
        marginRight: "1%",
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
    searchAgreement: {
        display: "flex",
        position: "relative",
        height: "200px",
    },
    searchAgreementText: {
        position: "absolute",
        marginLeft: "3%",
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: '3.5rem',
        color: "#5B5B5B",
        textShadow: '0px 4px 22px rgba(68, 94, 111, 0.1)',
    },
    chips: {
        position: "absolute",
        bottom: "10px",
        marginLeft: "3%",
        //backgroundColor:"red",
        width: "80%",
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

const globalData = new GlobalData();

const KPIs = () => {

    return (
        <>
            <Grid sx={classes.headContainer}
                  container
                  direction="row"
            >
                <Grid item sx={classes.head}>
                    Томский политех сегодня - это:
                </Grid>
            </Grid>

            <div style={classes.mainContainer}>
                <Grid
                    container
                    sx={classes.container}
                    columnSpacing={2}
                    rowSpacing={10}
                >
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon}
                            value={rootStore.globalDataStore.countriesList.length}
                            text={"стран" + VValidator(rootStore.globalDataStore.countriesList.length, "", "а", "ы") + ", с которыми\nзаключены договоры"}
                        />
                    </Grid>
                    <Grid item md={6} lg={3}>
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
                            text={"международные коллаборации"}
                        />

                    </Grid>
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon3}
                            value={453}
                            text={"совместные исследования"}
                        />
                    </Grid>
                </Grid>

                <img style={classes.background} src={background1} alt={"background1"}/>
                <img style={classes.background} src={background2} alt={"background2"}/>
            </div>
            <div style={classes.searchAgreement}>
                <div style={classes.searchAgreementText}>
                    Поиск договоров
                </div>
                <Grid
                    sx={classes.chips}
                    container
                    spacing={2}
                >
                    <Grid item>
                        <Chip text={rootStore.filtersStore.country?.name ?? ""}
                              f={() => {
                                  rootStore.filtersStore.updateCountry(null)
                              }}/>
                    </Grid>
                    <Grid item>
                        <Chip
                            text={rootStore.filtersStore.engineeringSchool?.name ?? ""}
                            f={() => {
                                rootStore.filtersStore.updateEngineeringSchool(null)
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Chip text={rootStore.filtersStore.representative?.name ?? ""}
                              f={() => {
                                  rootStore.filtersStore.updateEngineeringSchool(null)
                              }}/>
                    </Grid>
                    <Grid item>
                        <Chip text={rootStore.filtersStore.agrType?.name ?? ""}
                              f={() => {
                                  rootStore.filtersStore.updateAgrType(null)
                              }}/>
                    </Grid>

                </Grid>
            </div>
        </>
    )
}


export default observer(KPIs)
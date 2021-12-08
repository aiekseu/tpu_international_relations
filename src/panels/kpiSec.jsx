import {Grid,} from "@mui/material";
import background1 from "../images/Vector.png"
import background2 from "../images/Vector1.png"
import icon from "../images/icon (2).svg"
import icon1 from "../images/icon (1).svg"
import icon2 from "../images/icon (3).svg"
import icon3 from "../images/icon (4).svg"
import GlobalData from "../stores/globalDataStore";
import {observer} from "mobx-react-lite";
import KPI from "../components/KPI";
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
        fontSize: '5rem',
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
    const countriesNum = rootStore.kpiStore.kpi.countries_num;
    const annualAgreementsNum = rootStore.kpiStore.kpi.annual_agreements_num;
    const companiesNum = rootStore.kpiStore.kpi.companies_num;
    const researchesNum = rootStore.kpiStore.kpi.researches_num;

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
                            value={countriesNum}
                            text={"стран" + VValidator(countriesNum, "", "а", "ы") + ", с которыми заключены договоры"}
                        />
                    </Grid>
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon1}
                            value={annualAgreementsNum}
                            text={"договор" + VValidator(annualAgreementsNum, "ов", "", "а") + "за 2021г"}
                        />
                    </Grid>
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon2}
                            value={companiesNum}
                            text={"компан" + VValidator(researchesNum, "ий", "я", "ии") + " партнер" + VValidator(researchesNum,"ов","","а")}
                        />

                    </Grid>
                    <Grid item md={6} lg={3}>
                        <KPI
                            background={icon3}
                            value={researchesNum}
                            text={"совместн" + VValidator(researchesNum, "ых", "е", "ых") + " исследован" + VValidator(researchesNum, "ий", "е", "ия")}
                        />
                    </Grid>
                </Grid>

                <img style={classes.background} src={background1} alt={"background1"}/>
                <img style={classes.background} src={background2} alt={"background2"}/>
            </div>
        </>
    )
}

export default observer(KPIs)
import {Button, Grid, Typography,} from "@mui/material";
import earth from  "../images/earth.png"
import icon from "../images/kpi_2.svg"
import icon1 from "../images/kpi_1.svg"
import icon2 from "../images/kpi_3.svg"
import icon3 from "../images/kpi_4.svg"
import GlobalData from "../stores/globalDataStore";
import {observer} from "mobx-react-lite";
import KPI from "../components/KPI";
import rootStore from "../stores/rootStore";
import ReactDOM from "react-dom";


const classes = {
    headContainer: {
        height: "600px",
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
    button:{
        width: 300,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000000',
        border: '2px solid #69BC00',
        boxShadow: '0px 0px 20px rgba(138, 138, 138, 0.5)',
        borderRadius: 10,
    }
}

// Функция для корректного использования падежей
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
            >
                <Grid item sx={classes.head} width={700}>
                    Томский политех сегодня - это:
                    <Typography style={{marginTop: 50}} width={500}>Университет, где ученые работают над передовыми исследованиями в крупных международных научных проектах, а студенты ежегодно участвуют в программах академической мобильности и проходят стажировки и практики в ведущих компаниях.</Typography>
                    <Button variant="outlined" sx={classes.button} onClick={()=>{
                        window.scrollTo({top: window.innerHeight+500, behavior: 'smooth'})}}>Поиск договоров</Button>
                </Grid>
                <Grid item style={{marginLeft: 100,marginTop: 100, visibility: (window.innerWidth < 1290) ? 'hidden' : 'visible'}}>
                    <img src={earth}/>
                </Grid>
            </Grid>

            <div style={classes.mainContainer}>
                <Grid
                    container
                    sx={classes.container}
                    columnSpacing={2}
                    rowSpacing={10}
                >
                    <Grid item xs={12} md={6} lg={3}>
                        <KPI
                            background={icon}
                            value={countriesNum}
                            text={"стран" + VValidator(countriesNum, "", "а", "ы") + ", с которыми заключены договоры"}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <KPI
                            background={icon1}
                            value={annualAgreementsNum}
                            text={"договор" + VValidator(annualAgreementsNum, "ов", "", "а") + " за 2021г"}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <KPI
                            background={icon2}
                            value={companiesNum}
                            text={"компан" + VValidator(researchesNum, "ий", "я", "ии") + " партнер" + VValidator(researchesNum,"ов","","а")}
                        />

                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <KPI
                            background={icon3}
                            value={researchesNum}
                            text={"совместн" + VValidator(researchesNum, "ых", "е", "ых") + " исследован" + VValidator(researchesNum, "ий", "е", "ия")}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default observer(KPIs)
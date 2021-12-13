import {Container, Grid, Typography,} from "@mui/material";
import earth from "../images/earth.png"
import icon from "../images/kpi_2.svg"
import icon1 from "../images/kpi_1.svg"
import icon2 from "../images/kpi_3.svg"
import icon3 from "../images/kpi_4.svg"
import {observer} from "mobx-react-lite";
import KPI from "../components/KPI";
import rootStore from "../stores/rootStore";
import styled from "@emotion/styled";
import {LoadingButton} from "@mui/lab";
import theme from "../utils/theme";

const classes = {
    root: {
        minHeight: window.innerHeight - 48,
        marginTop: 56,
        paddingBottom: 16,
    },
    title: {
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: '4.5rem',
        lineHeight: 1.25,
        color: '#55802B',
        background: "-webkit-linear-gradient(300deg, rgba(85,128,43,0.8) 0%, rgba(43,128,87,1) 60%, rgba(43,128,72,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    subtitle: {
        marginTop: 2,
        fontSize: '1.25rem'
    },
    earth: {
        maxHeight: window.innerHeight * 0.6,
        [theme.breakpoints.down('lg')]: {
            display: 'none'
        },
        textAlign: 'center'
    },
}

const SearchButton = styled(LoadingButton)(({theme}) => ({
    borderRadius: 10,
    borderColor: theme.palette.success.main,
    borderWidth: 2,
    padding: 5,
    textTransform: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '1.25rem',
    color: '#5B5B5B',
    boxShadow: "0px 0px 10px 0px rgba(50, 86, 52, 0.4)",
    '&:hover': {
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        boxShadow: "0px 0px 12px 0px rgba(50, 106, 52, 0.4)",
    },
    marginTop: '36px',
    marginBottom: '16px',
    width: 300
}));

// Функция для корректного использования падежей
function VValidator(value, str1, str2, str3, onNull) {
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
    return (onNull)
}

const KPIs = () => {
    const countriesNum = rootStore.kpiStore.kpi.countries_num;
    const annualAgreementsNum = rootStore.kpiStore.kpi.annual_agreements_num;
    const companiesNum = rootStore.kpiStore.kpi.companies_num;
    const researchesNum = rootStore.kpiStore.kpi.researches_num;

    return (
        <div style={classes.root}>
            <Container maxWidth='lg'>
                <Grid container direction='row' justifyItems='end'>
                    <Grid item md={12} lg={6} xl={7}>
                        <Typography sx={classes.title}>Томский политех сегодня - это:</Typography>
                        <Typography sx={classes.subtitle}>Университет, где ученые работают над передовыми исследованиями
                            в крупных международных научных проектах, а студенты ежегодно участвуют в программах
                            академической мобильности и проходят стажировки и практики в ведущих компаниях.</Typography>
                        <SearchButton
                            variant='outlined'
                            loading={rootStore.globalDataStore.isFetching}
                            onClick={async () => {
                                window.scrollTo({top: window.innerHeight + 500, behavior: 'smooth'})
                            }}
                            TouchRippleProps={{style: {borderRadius: 8}}}
                        >
                            Поиск договоров
                        </SearchButton>
                    </Grid>
                    <Grid item md={false} lg={6} xl={5} sx={classes.earth}>
                        <img src={earth} alt='earth'/>
                    </Grid>
                </Grid>
            </Container>

            <Grid
                container
                direction='row'
                columnSpacing={2}
                rowSpacing={6}
                mt={7}
            >
                <Grid item xs={12} md={6} lg={3}>
                    <KPI
                        background={icon}
                        value={countriesNum}
                        text={"стран" + VValidator(countriesNum, "", "а", "ы", "ы") + ", с которыми заключены договоры"}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <KPI
                        background={icon1}
                        value={annualAgreementsNum}
                        text={"договор" + VValidator(annualAgreementsNum, "ов", "", "а", "ы") + " за 2021г"}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <KPI
                        background={icon2}
                        value={companiesNum}
                        text={"компан" + VValidator(researchesNum, "ий", "я", "ии", "ии") + " партнер" + VValidator(researchesNum, "ов", "", "а", "ы")}
                    />

                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <KPI
                        background={icon3}
                        value={researchesNum}
                        text={"совместн" + VValidator(researchesNum, "ых", "е", "ых", "е") + " исследован" + VValidator(researchesNum, "ий", "е", "ия", "ия")}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(KPIs)
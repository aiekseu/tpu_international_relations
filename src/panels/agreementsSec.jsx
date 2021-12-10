import Filters from "../components/filters";
import NewCustomMap from "../components/map";
import AboutCompanyCard from "../components/aboutCompany";
import {observer} from "mobx-react-lite";
import rootStore from "../stores/rootStore";
import {Grid, Typography} from "@mui/material";
import ChipBox from "../components/chipBox";
import TableCard from "../components/tableCard";
import InfButtons from "../components/InfButtons";

const classes = {
    root: {
        height: window.innerHeight,
        position: 'relative'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    filters: {
        position: 'absolute',
        top: 142,
        left: 48,
    },
    searchAgreement: {
        height: 120,
    },
    searchAgreementText: {
        marginLeft: "3%",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bold',
        fontSize: '3.5rem',
        color: "#5B5B5B",
        paddingBottom: "0",
        textShadow: '0px 4px 22px rgba(68, 94, 111, 0.1)',
    },
    chips: {
        marginLeft: "2%",
        width: "80%",
    },
    cont: {
        display: "flex",
        width: "100%",
    },
}

const Agreements = () => {

    return (
        <div style={classes.root}>
            <div style={classes.searchAgreement}>
                <Typography style={classes.searchAgreementText}>
                    Поиск договоров
                </Typography>
                <div style={classes.cont}>
                    <Grid
                        sx={classes.chips}
                        container
                        spacing={2}
                    >
                        <ChipBox text={rootStore.filtersStore.country?.name ?? ""}
                                 onDelete={() => {
                                     rootStore.filtersStore.updateCountry(null)
                                 }}
                        />
                        <ChipBox text={rootStore.filtersStore.engineeringSchool?.name ?? ""}
                                 onDelete={() => {
                                     rootStore.filtersStore.updateEngineeringSchool(null)
                                 }}
                        />
                        <ChipBox text={(rootStore.filtersStore.representative?.second_name ?? "") + " " + (rootStore.filtersStore.representative?.first_name ?? "")}
                                 onDelete={() => {
                                     rootStore.filtersStore.updateRepresentative(null)
                                 }}
                        />
                        <ChipBox text={rootStore.filtersStore.agrType?.name ?? ""}
                                 onDelete={() => {
                                     rootStore.filtersStore.updateAgrType(null)
                                 }}
                        />
                    </Grid>
                    <InfButtons/>
                </div>
            </div>


            {/*  Карта  */}
            <NewCustomMap/>

            {/*  Фильтры  */}
            <div style={classes.filters}>
                <Filters/>
            </div>

            {/*  Карточка компании  */}
            <div
                style={{ // Костыль, но нужный :(
                    visibility: rootStore.aboutCompanyStore.isOpen && rootStore.aboutCompanyStore.isCardChosen ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: 142,
                    right: 80
                }}
            >
                <AboutCompanyCard/>
            </div>

            {/*  Таблица компании  */}
            <div
                style={{ // Костыль, но нужный :(
                    visibility: rootStore.aboutCompanyStore.isOpen && !rootStore.aboutCompanyStore.isCardChosen ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: 142,
                    right: 80
                }}
            >
                <TableCard/>
            </div>
        </div>
    )
}

export default observer(Agreements)
import Filters from "../components/filters";
import NewCustomMap from "../components/map";
import AboutCompany from "../components/aboutCompany";
import {observer} from "mobx-react-lite";
import rootStore from "../stores/rootStore";
import {Grid, Typography} from "@mui/material";
import ChipBox from "../components/chipBox";

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
        height: "15%",
    },
    searchAgreementText: {
        marginLeft: "3%",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bold',
        fontSize: '3.5rem',
        color: "#5B5B5B",
        textShadow: '0px 4px 22px rgba(68, 94, 111, 0.1)',
    },
    chips: {
        marginLeft: "2%",
        width: "80%",
    },
}

const Agreements = () => {

    return (
        <div style={classes.root}>
            <div style={classes.searchAgreement}>
                <Typography style={classes.searchAgreementText}>
                    Поиск договоров
                </Typography>
                <Grid
                    sx={classes.chips}
                    container
                    spacing={2}
                >
                    <ChipBox text={rootStore.filtersStore.country?.name ?? ""}
                             f={() => {
                                 rootStore.filtersStore.updateCountry(null)
                             }}
                    />
                    <ChipBox text={rootStore.filtersStore.engineeringSchool?.name ?? ""}
                             f={() => {
                                 rootStore.filtersStore.updateEngineeringSchool(null)
                             }}
                    />
                    <ChipBox text={(rootStore.filtersStore.representative?.second_name ?? "") + " " + (rootStore.filtersStore.representative?.first_name ?? "")}
                             f={() => {
                                 rootStore.filtersStore.updateRepresentative(null)
                             }}
                    />
                    <ChipBox text={rootStore.filtersStore.agrType?.name ?? ""}
                             f={() => {
                                 rootStore.filtersStore.updateAgrType(null)
                             }}
                    />
                </Grid>
            </div>
            <NewCustomMap/>
            <div style={classes.filters}>
                <Filters/>
            </div>
            <div
                style={{ // Костыль, но нужный :(
                    visibility: rootStore.aboutCompanyStore.isOpen ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: 142,
                    right: 80
                }}
            >
                <AboutCompany/>
            </div>
        </div>
    )
}

export default observer(Agreements)
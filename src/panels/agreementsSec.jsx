import Filters from "../components/filters";
import NewCustomMap from "../components/map";
import AboutCompany from "../components/aboutCompany";
import {observer} from "mobx-react-lite";
import rootStore from "../stores/rootStore";

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
        top: 32,
        left: 48,
    },
}

const Agreements = () => {

    return (
        <div style={classes.root}>
            <NewCustomMap/>
            <div style={classes.filters}>
                <Filters/>
            </div>
            <div
                style={{ // Костыль, но нужный :(
                    visibility: rootStore.aboutCompanyStore.isOpen ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: 32,
                    right: 80
                }}
            >
                <AboutCompany/>
            </div>
        </div>
    )
}

export default observer(Agreements)
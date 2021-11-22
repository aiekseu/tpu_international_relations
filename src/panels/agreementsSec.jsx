import Filters from "../components/filters";
import NewCustomMap from "../components/map";

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
        top: 0,
        left: 0
    }
}

const Agreements = () => {

    return (
        <div style={classes.root}>
            <NewCustomMap/>
            <div style={classes.filters}>
                <Filters/>
            </div>
        </div>
    )
}

export default Agreements
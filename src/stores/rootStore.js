import FiltersStore from "./filtersStore";
import GlobalDataStore from "./globalDataStore";
import MapStore from "./mapStore";
import AboutCompanyStore from "./aboutCompanyStore";
import kpiStore from "./kpiStore";

class RootStore {
    kpiStore;
    filtersStore;
    globalDataStore;
    mapStore;
    aboutCompanyStore;
    constructor() {
        this.kpiStore = new kpiStore(this)
        this.filtersStore = new FiltersStore(this)
        this.globalDataStore = new GlobalDataStore(this)
        this.mapStore = new MapStore(this)
        this.aboutCompanyStore = new AboutCompanyStore(this)
    }
}

const rootStore = new RootStore()

export default rootStore

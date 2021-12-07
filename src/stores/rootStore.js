import FiltersStore from "./filtersStore";
import GlobalDataStore from "./globalDataStore";
import MapStore from "./mapStore";
import AboutCompanyStore from "./aboutCompanyStore";
import kpiStore from "./kpiStore";
import TableStore from "./tableStore";
import EditStore from "./editStore";

class RootStore {
    // Реализация синглтона
    kpiStore;
    filtersStore;
    globalDataStore;
    mapStore;
    aboutCompanyStore;
    tableStore;
    editStore;
    constructor() {
        this.kpiStore = new kpiStore(this)
        this.filtersStore = new FiltersStore(this)
        this.globalDataStore = new GlobalDataStore(this)
        this.mapStore = new MapStore(this)
        this.aboutCompanyStore = new AboutCompanyStore(this)
        this.tableStore = new TableStore(this)
        this.editStore = new EditStore(this)
    }
}

const rootStore = new RootStore()

export default rootStore

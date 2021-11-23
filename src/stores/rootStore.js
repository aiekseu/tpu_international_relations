import FiltersStore from "./filtersStore";
import GlobalDataStore from "./globalDataStore";
import MapStore from "./mapStore";

class RootStore {
    filtersStore;
    globalDataStore;
    mapStore;
    constructor() {
        this.filtersStore = new FiltersStore(this)
        this.globalDataStore = new GlobalDataStore(this)
        this.mapStore = new MapStore(this)
    }
}

const rootStore = new RootStore()

export default rootStore

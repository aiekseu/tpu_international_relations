import {makeAutoObservable, runInAction, toJS} from "mobx";

class MapStore {
    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    };

    get features() {
        return this.rootStore.globalDataStore.companiesList
            .filter((company) => company !== null && company.location !== null)
            .map((company) => {
                return {
                    id: company.id, //Для кооректной отрисовки ВСЕХ объектов - на будущее, чтобы не забыть
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: company.location
                    },
                    properties: {
                        clusterCaption: company.name,
                        iconCaption: company.name,
                    },
                    options: {
                        preset: "islands#blueGovernmentIcon",
                        openHintOnHover: false,
                    },
                };
            })
}

}

export default MapStore;
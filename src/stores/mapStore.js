import {makeAutoObservable, runInAction} from "mobx";

class MapStore {

    map;
    objectManager;
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
                    id: Math.random(), //Для кооректной отрисовки ВСЕХ объектов - на будущее, чтобы не забыть
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

    setCenterAndZoom() {
        this.map?.current.setBounds(this.objectManager?.current.getBounds());
        // if (this.map?.current.getZoom() > 10) {
        //     this.map?.current.setZoom(10)
        // }
    }

    setRefs(map, objectManager) {
        this.map = map;
        this.objectManager = objectManager;
    }

}

export default MapStore;
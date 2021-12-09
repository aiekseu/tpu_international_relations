import {makeAutoObservable} from "mobx";
import rootStore from "./rootStore";

class MapStore {

    map;
    objectManager;
    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    };

    // Получение массива точек компаний для карты
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
    }

    setRefs(map, objectManager) {
        this.map = map;
        this.objectManager = objectManager;
    }

    // Клик на Placemark (компанию) на карте
    setClickEvent() {
        this.objectManager.current?.objects.events.add('click', (e) => {
            // Используем айдишник для того, чтобы далее получить инфу по метке
            const objectId = e.get('objectId');
            const companyName = this.objectManager.current.objects.getById(objectId).properties.clusterCaption

            let company = this.rootStore.globalDataStore.companiesList.find((element) => element.name === companyName);
            this.rootStore.filtersStore.setCurrentCompany(company)
        })
    }
}

export default MapStore;
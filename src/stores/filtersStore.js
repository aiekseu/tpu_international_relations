import {makeAutoObservable} from "mobx";

class FiltersStore {

    country = {};
    representative = {};
    engineeringSchool = {};
    agrType = {};
    agrState = {
        active: false,
        expired: false,
        expiringSoon: false
    };

    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    };

    updateCountry(country) {
        this.country = country;
    }

    updateRepresentative(representative) {
        this.representative = representative
    }

    updateAgrType(agrType) {
        this.agrType = agrType
    }

    updateAgrState({agrState, newState}) {
        this.agrState[agrState] = newState;
    }

    updateEngineeringSchool(engineeringSchool) {
        this.engineeringSchool = engineeringSchool
    }

    findCompanies()  {
        console.log(this.rootStore)
         this.rootStore.globalDataStore.updateCompanies({
            country: this.country,
            agrType: this.agrType,
            representative: this.representative,
            engineeringSchool: this.engineeringSchool,
            agrStates: this.agrState
        })
    }
}

export default FiltersStore;
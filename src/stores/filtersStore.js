import {makeAutoObservable, runInAction} from "mobx";

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

    isTable = false;
    isOpen = true;

    // ключи для Autocomplete компонентов
    countryKey = Math.random();
    representativeKey = Math.random();
    engineeringSchoolKey = Math.random();
    agrTypeKey = Math.random();

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    };

    updateCountry(country) {
        this.country = country;
        if (country === null) this.countryKey++;
    }

    updateRepresentative(representative) {
        this.representative = representative
        if (representative === null) this.representativeKey++;
    }

    updateAgrType(agrType) {
        this.agrType = agrType
        if (agrType === null) this.agrTypeKey++;
    }

    updateAgrState({agrState, newState}) {
        this.agrState[agrState] = newState;
    }

    updateEngineeringSchool(engineeringSchool) {
        this.engineeringSchool = engineeringSchool
        if (engineeringSchool === null) this.engineeringSchoolKey++;
    }

    // Функция клика по кнопке "Найти"
    findCompanies() {
        this.rootStore.globalDataStore.updateCompanies({
            country: this.country ?? {},
            agrType: this.agrType ?? {},
            representative: this.representative ?? {},
            engineeringSchool: this.engineeringSchool ?? {},
            agrStates: this.agrState ?? {}
        })
    }

    openOrHideFiltersPanel() {
        runInAction(() => {
            this.isOpen = !this.isOpen
        })
    }

    // Для клика на компанию в списке
    setCurrentCompany(company) {
        this.rootStore.aboutCompanyStore.setCompany(company)
    }

    updateAgrStates(index) {
        // active
        // expired
        // expiringSoon
        this.agrState[index] = !this.agrState[index];
    }
}

export default FiltersStore;
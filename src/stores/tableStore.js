import {makeAutoObservable, runInAction} from "mobx";
import {baseURL} from "../utils/API";
import {PIE_CHART_COLORS} from "../utils/pieChartColors";

class TableStore {
    pieChartData = {}
    isFetching = false;
    rootStore;
    companyAgreements = [];

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.companyAgreements = rootStore.aboutCompanyStore.companyAgreements
    }

    openOrCloseTable() {
        this.rootStore.aboutCompanyStore.openOrCloseAboutCompanyPanel()
    }
}

export default TableStore
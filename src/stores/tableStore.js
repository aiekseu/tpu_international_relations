import {makeAutoObservable, runInAction} from "mobx";

class TableStore {
    company = {};
    companyAgreements = [];

    pieChartData = {};

    isOpen = true; //TODO: поменять
    isFetching = false;

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.pieChartActiveIndex = 0;
    }

    openOrCloseTable() {
        runInAction(() => {
            this.isOpen = !this.isOpen
        })
    }
}

export default TableStore
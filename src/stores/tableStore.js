import {makeAutoObservable, runInAction} from "mobx";

class TableStore {
    pieChartData = {};

    isFetching = false;

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    openOrCloseTable() {
        this.rootStore.aboutCompanyStore.openOrCloseAboutCompanyPanel()
    }
}

export default TableStore
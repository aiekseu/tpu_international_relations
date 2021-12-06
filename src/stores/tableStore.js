import {makeAutoObservable} from "mobx";

class TableStore {
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
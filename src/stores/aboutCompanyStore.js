import {makeAutoObservable, runInAction} from "mobx";


class AboutCompanyStore {

    company = {};
    companyAgreements = [];
    companyPieChart;

    isOpen = false;

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    setCompany(company) {
        runInAction(() => {
            this.company = company;
            this.isOpen = true
        })
    }

    openOrCloseAboutCompanyPanel() {
        runInAction(() => {
            this.isOpen = !this.isOpen
        })
    }

}

export default AboutCompanyStore
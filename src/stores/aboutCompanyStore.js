import {makeAutoObservable, runInAction} from "mobx";
import {baseURL} from "../utils/API";


class AboutCompanyStore {

    company = {};
    companyAgreements = [];
    companyPieChartSections = {};

    isOpen = true;

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    fetchAgreements(company) {
        fetch(`${baseURL}/agreements?id_company=${company.id}`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.companyAgreements = json;
                    let tempPieChartSections = {};
                    json.map((agreement) =>
                        tempPieChartSections[`${agreement['id_agr_type']}`]++
                    )
                    this.companyPieChartSections = tempPieChartSections;
                })
            })
    }

    setCompany(company) {
        runInAction(() => {
            this.company = company
            this.fetchAgreements(company)
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
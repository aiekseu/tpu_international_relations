import {makeAutoObservable, runInAction} from "mobx";
import {baseURL} from "../utils/API";
import {PIE_CHART_COLORS} from "../utils/pieChartColors";
import rootStore from "./rootStore";

class TableStore {
    pieChartData = {}
    isFetching = false;
    rootStore;
    companyAgreements = [];

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.companyAgreements = this.rootStore.aboutCompanyStore.companyAgreements
    }

    openOrCloseTable() {
        this.rootStore.aboutCompanyStore.openOrCloseAboutCompanyPanel()
    }

    getAgrInf(i) {
        runInAction((i)=>{
            console.log(rootStore.aboutCompanyStore.companyAgreements[i]?.agreement_type.name)
            console.log([this.companyAgreements[i]?.agreement_type.name, this.companyAgreements[i]?.comments])
            return(
                i+1,
            this.companyAgreements[i]?.agreement_type.name,
                this.companyAgreements[i]?.comments,
            this.companyAgreements[i]?.start_date ?? "-",
            this.companyAgreements[i]?.end_date ?? "-",
            this.companyAgreements[i]?.representative.first_name + " " + this.companyAgreements[i]?.representative.second_name,
            this.companyAgreements[i]?.representative?.phone ?? "-",
            this.companyAgreements[i]?.representative?.email ?? "-",
            this.companyAgreements[i]?.partner.first_name + " " + this.companyAgreements[i]?.partner.second_name,
                this.companyAgreements[i]?.partner.email,
                this.companyAgreements[i]?.partner.phone,
                this.companyAgreements[i]?.partner.news_url
            )})
    }
}

export default TableStore
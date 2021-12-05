import {makeAutoObservable, runInAction} from "mobx";
import {baseURL} from "../utils/API";
import {PIE_CHART_COLORS} from "../utils/pieChartColors";


class AboutCompanyStore {

    company = {};
    companyAgreements = [];
    timeLineData = [];

    pieChartData = {};

    isOpen = false; //TODO: поменять на false
    isCardChoosen = false;
    isFetching = false;

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    fetchAgreements(company) {
        this.changeIsFetchingState()
        fetch(`${baseURL}/agreements?id_company=${company.id}`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.companyAgreements = json;

                    // Формирование массива с данными для пай чарта
                    let tempPieChartSections = {};
                    let tempAgrTypeNames = {};
                    json.map((agreement) => {
                        tempPieChartSections[agreement['agreement_type']['id']]
                            ? tempPieChartSections[agreement['agreement_type']['id']]++
                            : tempPieChartSections[agreement['agreement_type']['id']] = 1

                        tempAgrTypeNames[agreement['agreement_type']['id']] = agreement['agreement_type']['name']
                    })

                    let pieChartData = [];
                    for (let agrtypeID in tempPieChartSections) {
                        pieChartData.push({
                            name: tempAgrTypeNames[agrtypeID],
                            value: tempPieChartSections[agrtypeID],
                            fill: PIE_CHART_COLORS[agrtypeID]
                        })
                    }
                    this.pieChartData = pieChartData;
                    this.fetchTimeLineData(company);
                    this.changeIsFetchingState()
                })
            })

    }

    fetchTimeLineData(company) {
        fetch(`${baseURL}/timeline/${company.id}`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.timeLineData = json;
                })
                console.log(json)
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

    changeIsFetchingState() {
        runInAction(() => {
            this.isFetching = !this.isFetching
        })
    }

}

export default AboutCompanyStore
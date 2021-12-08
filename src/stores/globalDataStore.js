import {makeAutoObservable, runInAction, toJS} from "mobx"
import {baseURL} from "../utils/API";

class GlobalDataStore {

    countriesList = [];
    engineerSchoolsList = [];
    representativesList = [];
    agreementTypesList = [];
    companiesList = [];
    agreementsList = [];

    isFetching = false; // для отображения процесса загрузки

    isAuthorized = false; //TODO: false

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.fetchData()
    }

    // Получение всех стран, инженерных школ, ответственных лиц в тпу, типов договров, компаний
    fetchData() {
        fetch('https://tpu-international-backend.herokuapp.com/api/countries')
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.countriesList = json;
                })
            })
        fetch(`${baseURL}/schools`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.engineerSchoolsList = json;
                })
            })
        fetch(`${baseURL}/representatives`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.representativesList = json;
                })
            })
        fetch(`${baseURL}/agreement_types`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.agreementTypesList = json;
                })
            })
        fetch(`${baseURL}/companies`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.companiesList = json;
                })
            })
    }

    // выбор компании из списка или на карте
    updateCompanies({country, agrType, engineeringSchool, representative, agrStates}) {
        this.changeFetchingState()

        let countryID = toJS(country).id ?? null
        let agrTypeID = toJS(agrType).id ?? null
        let engineeringSchoolID = toJS(engineeringSchool).id ?? null
        let representativeID = toJS(representative).id ?? null

        // query-запрос для состояния договоров
        let agrStateQuery = '&state=';
        if (agrStates['active']) {
            agrStateQuery += 'active'
        }
        if (agrStates['expired']) {
            if (agrStateQuery.slice(-1) !== '=') agrStateQuery+= ','
            agrStateQuery += 'expired'
        }
        if (agrStates['expiringSoon']) {
            if (agrStateQuery.slice(-1) !== '=' && agrStateQuery.slice(-1) !== ',') agrStateQuery+= ','
            agrStateQuery += 'expiringSoon'
        }
        if (agrStateQuery === '&state=') {
            agrStateQuery = ''
        }

        let query = `${countryID ? 'id_country=' + countryID : ''}` +
            `${agrTypeID ? '&id_agreement_type=' + agrTypeID : ''}` +
            `${engineeringSchoolID ? '&id_school=' + engineeringSchoolID : ''}` +
            `${representativeID ? '&id_representative=' + representativeID : ''}` +
            `${agrStateQuery}`

        fetch(`${baseURL}/companies/?${query}`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.companiesList = json;
                })
            })
            .then(() => {
                // центрирование и зум карты
                this.rootStore.mapStore.setCenterAndZoom()
                this.changeFetchingState()
            })
    }

    changeFetchingState() {
        runInAction(() => {
            this.isFetching = !this.isFetching
        })
    }

    // получение данных в формате "7 декабря 2021, нечетная неделя"
    get todayDate() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let fMonth = ''
        let day = date.getDate()

        let oddness = 'нечетная неделя'
        let studyYearStart = new Date(year, 7, 27) // Дата начала учебного года
        let weeksPassed = Math.round((date - studyYearStart) / (1000 * 60 * 60 * 24 * 7))

        if (weeksPassed % 2 === 0) {
            oddness = 'четная неделя'
        }

        switch (month)
        {
            case 0: fMonth="января"; break;
            case 1: fMonth="февраля"; break;
            case 2: fMonth="марта"; break;
            case 3: fMonth="апреля"; break;
            case 4: fMonth="мае"; break;
            case 5: fMonth="июня"; break;
            case 6: fMonth="июля"; break;
            case 7: fMonth="августа"; break;
            case 8: fMonth="сентября"; break;
            case 9: fMonth="октября"; break;
            case 10: fMonth="ноября"; break;
            case 11: fMonth="декабря"; break;
        }

        return (day + " " + fMonth + " " + year + ', ' + oddness);
    }

    authorize() {
        this.isAuthorized = !this.isAuthorized;
    }
}

export default GlobalDataStore;
import {makeAutoObservable, runInAction, toJS} from "mobx"
import {baseURL} from "../utils/API";
import rootStore from "./rootStore";

class GlobalDataStore {

    countriesList = [];
    engineerSchoolsList = [];
    representativesList = [];
    agreementTypesList = [];
    companiesList = [];
    agreementsList = [];

    isFetching = false;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.fetchData()
    }

    fetchData() {
        fetch('https://tpu-international-backend.herokuapp.com/api/countries')
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.countriesList = json;
                })
            })
        fetch(`${baseURL}/agreement_types`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.agreementTypesList = json;
                })
            })
        fetch(`${baseURL}/representatives`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.representativesList = json;
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

     updateCompanies({country, agrType, engineeringSchool, representative, agrStates}) {
        this.changeFetchingState()
         fetch(`${baseURL}/companies?id_country=${toJS(country).id}`)
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.companiesList = json;
                })
            })
             .then(() => {
                 // this.rootStore.mapStore.setCenterAndZoom(this.companiesList[0])
                 this.rootStore.mapStore.setCenterAndZoom()
             })
        this.changeFetchingState()
    }

    changeFetchingState() {
        runInAction(() => {
            this.isFetching = !this.isFetching
        })
    }
}

export default GlobalDataStore;
import {makeAutoObservable} from "mobx"
import {baseURL} from "../utils/API";

class GlobalData {

    countriesList = [];
    engineerSchoolsList = [];
    representativesList = [];
    agreementTypesList = [];
    companiesList = [];
    agreementsList = [];

    constructor() {
        makeAutoObservable(this)
        this.fetchData()
    }

    fetchData() {
        fetch('https://tpu-international-backend.herokuapp.com/api/countries')
            .then(response => response.json())
            .then(json => {
                this.countriesList = json;
            })
        fetch(`${baseURL}/agreement_types`)
            .then(response => response.json())
            .then(json => {
                this.agreementTypesList = json;
            })
        fetch(`${baseURL}/representatives`)
            .then(response => response.json())
            .then(json => {
                this.representativesList = json;
            })
        fetch(`${baseURL}/companies`)
            .then(response => response.json())
            .then(json => {
                this.companiesList = json;
            })
    }
}

export default GlobalData;
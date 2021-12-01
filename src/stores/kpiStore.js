import {makeAutoObservable, runInAction} from "mobx"

class kpiStore {

    kpi = [];

    isFetching = false;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
        this.fetchData()
    }

    fetchData() {
        fetch('https://tpu-international-backend.herokuapp.com/api/kpi')
            .then(response => response.json())
            .then(json => {
                runInAction(() => {
                    this.kpi = json;
                })
            })
    }

}
export default kpiStore
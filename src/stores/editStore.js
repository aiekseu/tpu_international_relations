import {makeAutoObservable, runInAction} from "mobx"

class EditStore {

    isEditCompanyDialogOpen = false;

    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    closeEditCompanyDialog = () => {
        runInAction(() => {
            this.isEditCompanyDialogOpen = false
        })
    }

    openEditCompanyDialog() {
        runInAction(() => {
            this.isEditCompanyDialogOpen = true
        })
    }

}
export default EditStore
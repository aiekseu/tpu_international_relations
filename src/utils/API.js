import axios from "axios";

export default axios.create({
    baseURL: "https://tpu-international-backend.herokuapp.com/api",
    responseType: "json"
});
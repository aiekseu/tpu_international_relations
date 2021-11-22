import axios from "axios";

export const baseURL = 'https://tpu-international-backend.herokuapp.com/api';

export default axios.create({
    baseURL: "https://tpu-international-backend.herokuapp.com/api",
    responseType: "json"
});
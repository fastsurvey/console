import axios from 'axios';
import {AUTH_BACKEND_URL} from '../constants';

export function authPostRequest(url: string, data: {[key: string]: any}) {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return axios.post(AUTH_BACKEND_URL + url, formData);
}

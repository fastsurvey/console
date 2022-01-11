import axios from 'axios';
import {types} from '/src/types';

const VITE_ENV = import.meta.env.VITE_ENV;
const VITE_API_URL = import.meta.env.VITE_API_URL;

let baseUrl = VITE_ENV === 'development' ? 'dev.fastsurvey.de' : 'fastsurvey.de';
let apiUrl = VITE_API_URL !== undefined ? VITE_API_URL : `https://api.${baseUrl}`;

function headers(accessToken?: types.AccessToken) {
    if (accessToken) {
        return {
            headers: {
                Authorization: `bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };
    } else {
        return {headers: {'Content-Type': 'application/json'}};
    }
}

export function httpPost(url: string, data: any, accessToken?: types.AccessToken) {
    return axios.post(apiUrl + url, data, headers(accessToken));
}

export function httpPut(url: string, data: any, accessToken?: types.AccessToken) {
    return axios.put(apiUrl + url, data, headers(accessToken));
}

export function httpGet(url: string, accessToken?: types.AccessToken) {
    return axios.get(apiUrl + url, headers(accessToken));
}

export function httpDelete(url: string, accessToken: types.AccessToken) {
    return axios.delete(apiUrl + url, headers(accessToken));
}

class ServerError extends Error {
    constructor(context: any) {
        super('Server Error');
        this.name = 'SERVER_ERROR';
        this.message = JSON.stringify({context});
    }
}

export function throwServerError(context: any) {
    throw new ServerError(context);
}

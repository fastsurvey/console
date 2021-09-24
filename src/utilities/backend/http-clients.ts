import axios from 'axios';
import {types} from '@types';

let API_URL: string;
switch (import.meta.env.MODE) {
    case 'development':
        API_URL = 'https://api.dev.fastsurvey.de';
        break;
    case 'production':
        API_URL = 'https://api.fastsurvey.de';
        break;
}

export function httpPost(
    url: string,
    data: any,
    accessToken?: types.AccessToken,
) {
    return axios.post(API_URL + url, data, headers(accessToken));
}

export function httpPut(
    url: string,
    data: any,
    accessToken: types.AccessToken,
) {
    return axios.put(API_URL + url, data, headers(accessToken));
}

export function httpGet(url: string, accessToken?: types.AccessToken) {
    return axios.get(API_URL + url, headers(accessToken));
}

export function httpDelete(url: string, accessToken: types.AccessToken) {
    return axios.delete(API_URL + url, headers(accessToken));
}

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

import axios from 'axios';
import {types} from '@types';

// const API_URL = 'http://localhost:8000';
const API_URL = 'https://api.fastsurvey.de';
// const API_URL = 'https://commit-a4f154a---backend-dev-gz5l57j4mq-ew.a.run.app';

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

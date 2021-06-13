import axios from 'axios';
import {types} from 'types';

const API_URL = 'http://localhost:8000';
// const API_URL = 'https://backend.dev.fastsurvey.io';

export function httpPost(
    url: string,
    dataObject: {[key: string]: any},
    auth_token?: types.AuthToken,
) {
    const data = JSON.stringify(dataObject);

    if (auth_token) {
        return axios.post(API_URL + url, data, {
            headers: {
                Authorization: `${auth_token.token_type} ${auth_token.access_token}`,
            },
        });
    } else {
        return axios.post(API_URL + url, data);
    }
}

export function httpPut(
    url: string,
    dataObject: {[key: string]: any},
    auth_token: types.AuthToken,
) {
    return axios.put(API_URL + url, JSON.stringify(dataObject), {
        headers: {
            Authorization: `${auth_token.token_type} ${auth_token.access_token}`,
        },
    });
}

export function httpGet(url: string, auth_token?: types.AuthToken) {
    if (auth_token) {
        return axios.get(API_URL + url, {
            headers: {
                Authorization: `${auth_token.token_type} ${auth_token.access_token}`,
            },
        });
    } else {
        return axios.get(API_URL + url);
    }
}

export function httpDelete(url: string, auth_token: types.AuthToken) {
    return axios.delete(API_URL + url, {
        headers: {
            Authorization: `${auth_token.token_type} ${auth_token.access_token}`,
        },
    });
}

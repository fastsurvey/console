import axios from 'axios';
import {types} from 'types';
import {constants} from 'utilities';

export function authPostRequest(url: string, data: {[key: string]: any}) {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return axios.post(constants.environment.AUTH_BACKEND_URL + url, formData);
}

export function authGetRequest(url: string, oauth2_token: types.AuthToken) {
    return axios.get(constants.environment.AUTH_BACKEND_URL + url, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

export function surveyGetRequest(url: string, oauth2_token: types.AuthToken) {
    return axios.get(constants.environment.SURVEY_BACKEND_URL + url, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

export function surveyPostRequest(
    url: string,
    oauth2_token: types.AuthToken,
    body: any,
) {
    return axios.post(constants.environment.SURVEY_BACKEND_URL + url, body, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

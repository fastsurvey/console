import axios from 'axios';

import environment from 'utilities/constants/environment';
import {stateTypes} from 'utilities';

export function authPostRequest(url: string, data: {[key: string]: any}) {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return axios.post(environment.AUTH_BACKEND_URL + url, formData);
}

export function authGetRequest(
    url: string,
    oauth2_token: stateTypes.OAuth2Token,
) {
    return axios.get(environment.AUTH_BACKEND_URL + url, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

export function surveyGetRequest(
    url: string,
    oauth2_token: stateTypes.OAuth2Token,
) {
    return axios.get(environment.SURVEY_BACKEND_URL + url, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

export function surveyPostRequest(
    url: string,
    oauth2_token: stateTypes.OAuth2Token,
    body: any,
) {
    return axios.post(environment.SURVEY_BACKEND_URL + url, body, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

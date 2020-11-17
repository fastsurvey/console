import axios from 'axios';
import {SURVEY_BACKEND_URL, AUTH_BACKEND_URL} from '../constants';
import stateTypes from './types/stateTypes';

export function authPostRequest(url: string, data: {[key: string]: any}) {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return axios.post(AUTH_BACKEND_URL + url, formData);
}

export function surveyGetRequest(
    url: string,
    oauth2_token: stateTypes.OAuth2Token,
) {
    return axios.get(SURVEY_BACKEND_URL + url, {
        headers: {
            Authorization: 'bearer ' + oauth2_token.access_token,
        },
    });
}

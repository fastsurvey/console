import {surveyGetRequest} from './axiosClients';
import {OAuth2Token, SurveyConfig} from './types';

export async function fetchSurveys(
    oauth2_token: OAuth2Token,
    addConfigs: (configs: SurveyConfig[]) => void,
) {
    // TODO: Username in account
    surveyGetRequest('/fastsurvey', oauth2_token)
        .then((response) => {
            addConfigs(response.data.configs);
        })
        .catch(() => {
            // TODO: If 401 -> refresh token
        });
}

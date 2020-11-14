import {surveyGetRequest} from './axiosClients';
import {OAuth2Token, SurveyConfig, SurveyField} from './types';

export async function fetchSurveys(
    oauth2_token: OAuth2Token,
    addConfigs: (configs: SurveyConfig[]) => void,
) {
    // TODO: Username in account
    surveyGetRequest('/fastsurvey', oauth2_token)
        .then((response) => {
            const configs = response.data.configs;
            configs.forEach((config: SurveyConfig, index: number) => {
                config.local_id = index;
                config.fields.forEach(
                    (field: SurveyField, subIndex: number) => {
                        field.local_id = 1000 * index + subIndex;
                    },
                );
            });
            addConfigs(configs);
        })
        .catch(() => {
            // TODO: If 401 -> refresh token
        });
}

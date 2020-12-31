import {
    stateTypes,
    configTypes,
    surveyGetRequest,
    addLocalIds,
} from 'utilities';

async function fetchSurveys(
    oauth2_token: stateTypes.OAuth2Token,
    addConfigs: (configs: configTypes.SurveyConfig[]) => void,
) {
    // TODO: Username in account
    surveyGetRequest('/fastsurvey', oauth2_token)
        .then((response) => {
            const configs = response.data.configs;
            configs.map(addLocalIds.survey);
            addConfigs(configs);
        })
        .catch(() => {
            // TODO: If 401 -> refresh token
        });
}

export default fetchSurveys;

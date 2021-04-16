import {
    stateTypes,
    configTypes,
    surveyGetRequest,
    addLocalIds,
} from 'utilities';

async function fetchConfigs(
    oauth2_token: stateTypes.OAuth2Token,
    addConfigs: (configs: configTypes.SurveyConfig[]) => void,
) {
    // TODO: Use actual username from account
    surveyGetRequest('/users/123/surveys', oauth2_token)
        .then((response) => {
            const configs = response.data;
            configs.map(addLocalIds.survey);
            addConfigs(configs);
        })
        .catch(() => {
            // TODO: If 401 -> refresh token
            console.error('Could not fetch survey configs');
        });
}

export default fetchConfigs;

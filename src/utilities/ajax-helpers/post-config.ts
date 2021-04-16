import {stateTypes, configTypes, surveyPostRequest} from 'utilities';

async function postConfig(
    oauth2_token: stateTypes.OAuth2Token,
    config: configTypes.SurveyConfig,
) {
    // TODO: Use actual username from account
    surveyPostRequest(
        `/users/123/surveys/${config.survey_name}`,
        oauth2_token,
        config,
    )
        .then(() => {})
        .catch(() => {
            // TODO: If 401 -> refresh token
            console.error('Could not fetch survey configs');
            throw Error;
        });
}

export default postConfig;

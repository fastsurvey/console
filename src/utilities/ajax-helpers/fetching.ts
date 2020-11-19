import {stateTypes, configTypes, surveyGetRequest} from 'utilities';

async function fetchSurveys(
    oauth2_token: stateTypes.OAuth2Token,
    addConfigs: (configs: configTypes.SurveyConfig[]) => void,
) {
    // TODO: Username in account
    surveyGetRequest('/fastsurvey', oauth2_token)
        .then((response) => {
            const configs = response.data.configs;
            configs.forEach(
                (config: configTypes.SurveyConfig, index: number) => {
                    config.local_id = index;
                    config.fields.forEach(
                        (field: configTypes.SurveyField, subIndex: number) => {
                            field.local_id = 1000 * index + subIndex;
                            if (
                                field.type === 'Radio' ||
                                field.type === 'Selection'
                            ) {
                                field.fields.forEach(
                                    (
                                        fieldOption: configTypes.FieldOption,
                                        subSubIndex: number,
                                    ) => {
                                        fieldOption.local_id =
                                            1000 * field.local_id + subSubIndex;
                                    },
                                );
                            }
                        },
                    );
                },
            );
            addConfigs(configs);
        })
        .catch(() => {
            // TODO: If 401 -> refresh token
        });
}

export default fetchSurveys;

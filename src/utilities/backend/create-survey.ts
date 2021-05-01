import {types} from 'types';
import {httpPost} from './http-clients';
import {localIdUtils} from 'utilities';

async function createSurvey(
    account: types.Account,
    authToken: types.AuthToken,
    config: types.SurveyConfig,
    success: () => void,
    error: (code: 400 | 401 | 422 | 500) => void,
) {
    try {
        await httpPost(
            `/users/${account.username}/surveys/${config.survey_name}`,
            localIdUtils.remove.survey(config),
            authToken,
        ).catch((response: {statusCode: 400 | 401 | 422 | 500}) => {
            throw response.statusCode;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default createSurvey;

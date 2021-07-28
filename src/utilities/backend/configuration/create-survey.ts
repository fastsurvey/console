import {types} from '@types';
import {localIdUtils} from '@utilities';
import {httpPost} from '../http-clients';

async function createSurvey(
    account: types.Account,
    authToken: types.AuthToken,
    config: types.SurveyConfig,
    success: () => void,
    error: (code: any) => void,
) {
    try {
        await httpPost(
            `/users/${account.username}/surveys/${config.survey_name}`,
            localIdUtils.remove.survey(config),
            authToken,
        ).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default createSurvey;

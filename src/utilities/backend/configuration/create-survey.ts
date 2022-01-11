import {types} from '/src/types';
import {httpPost, throwServerError} from '../http-clients';
import {localIdUtils} from '/src/utilities';

async function createSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    config: types.SurveyConfig,
    success: () => void,
    error: (reason: 'authentication' | 'server') => void,
) {
    try {
        await httpPost(
            `/users/${account.username}/surveys`,
            JSON.stringify(localIdUtils.remove.survey(config)),
            accessToken,
        ).catch((error) => {
            throw error.response !== undefined ? error.response : error;
        });

        success();
    } catch (response: any) {
        if (response.status === 401) {
            error('authentication');
        } else {
            error('server');
            throwServerError({response, account, config});
        }
    }
}

export default createSurvey;

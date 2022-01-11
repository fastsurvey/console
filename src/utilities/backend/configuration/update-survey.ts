import {types} from '/src/types';
import {localIdUtils} from '/src/utilities';
import {httpPut, throwServerError} from '../http-clients';

async function updateSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    config: types.SurveyConfig,
    success: () => void,
    error: (reason: 'authentication' | 'server') => void,
) {
    try {
        await httpPut(
            `/users/${account.username}/surveys/${centralConfigName}`,
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
            throwServerError({response, account, config, centralConfigName});
        }
    }
}

export default updateSurvey;

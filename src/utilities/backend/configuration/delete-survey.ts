import {types} from '/src/types';
import {httpDelete, throwServerError} from '../http-clients';

async function deleteSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    configName: string,
    success: () => void,
    error: (reason: 'authentication' | 'server') => void,
) {
    try {
        await httpDelete(
            `/users/${account.username}/surveys/${configName}`,
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
            throwServerError({response, account, configName});
        }
    }
}

export default deleteSurvey;

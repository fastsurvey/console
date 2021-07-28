import {types} from '@types';
import {httpDelete} from '../http-clients';

async function deleteSurvey(
    account: types.Account,
    authToken: types.AuthToken,
    centralConfigName: string,
    success: () => void,
    error: (code: any) => void,
) {
    try {
        await httpDelete(
            `/users/${account.username}/surveys/${centralConfigName}`,
            authToken,
        ).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default deleteSurvey;

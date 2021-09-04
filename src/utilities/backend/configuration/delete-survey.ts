import {types} from '@types';
import {httpDelete} from '../http-clients';

async function deleteSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    success: () => void,
    error: (code: any) => void,
) {
    try {
        await httpDelete(
            `/users/${account.username}/surveys/${centralConfigName}`,
            accessToken,
        ).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default deleteSurvey;

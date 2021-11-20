import {types} from '/src/types';
import {httpPost} from '../http-clients';

async function createSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    config: types.SurveyConfig,
    success: () => void,
    error: (code: any) => void,
) {
    try {
        await httpPost(
            `/users/${account.username}/surveys`,
            config,
            accessToken,
        ).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default createSurvey;

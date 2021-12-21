import {types} from '/src/types';
import {httpPost} from '../http-clients';
import {localIdUtils} from '/src/utilities';

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
            JSON.stringify(localIdUtils.remove.survey(config)),
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

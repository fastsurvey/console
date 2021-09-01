import {types} from '@types';
import {localIdUtils} from '@utilities';
import {httpPut} from '../http-clients';

async function updateSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    config: types.SurveyConfig,
    success: () => void,
    error: (code: 400 | 401 | 422 | 500) => void,
) {
    try {
        await httpPut(
            `/users/${account.username}/surveys/${centralConfigName}`,
            JSON.stringify(localIdUtils.remove.survey(config)),
            accessToken,
        ).catch((response: {statusCode: 400 | 401 | 422 | 500}) => {
            throw response.statusCode;
        });

        success();
    } catch (code) {
        // @ts-ignore
        error(code);
    }
}

export default updateSurvey;

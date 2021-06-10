import {types} from 'types';
import {httpPut} from './http-clients';
import {localIdUtils} from 'utilities';

async function updateSurvey(
    account: types.Account,
    authToken: types.AuthToken,
    centralConfigName: string,
    config: types.SurveyConfig,
    success: () => void,
    error: (code: 400 | 401 | 422 | 500) => void,
) {
    try {
        await httpPut(
            `/users/${account.username}/surveys/${centralConfigName}`,
            localIdUtils.remove.survey(config),
            authToken,
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

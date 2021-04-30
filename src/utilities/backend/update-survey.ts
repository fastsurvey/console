import {types} from 'types';
import {httpPut} from './http-clients';
import {removeLocalIds} from 'utilities';

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
            removeLocalIds.survey(config),
            authToken,
        ).catch((response: {statusCode: 400 | 401 | 422 | 500}) => {
            throw response.statusCode;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default updateSurvey;

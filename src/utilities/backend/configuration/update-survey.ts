import {types} from '@types';
import {localIdUtils} from '@utilities';
import {httpPut} from '../http-clients';

async function updateSurvey(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    config: types.SurveyConfig,
    success: () => void,
    error: (message: 'error-submissions-exist' | 'error-server') => void,
) {
    try {
        await httpPut(
            `/users/${account.username}/surveys/${centralConfigName}`,
            JSON.stringify(localIdUtils.remove.survey(config)),
            accessToken,
        ).catch((response) => {
            if (response.response.data.detail === 'submissions exist') {
                throw 'error-submissions-exist';
            } else {
                throw 'error-server';
            }
        });

        success();
    } catch (m: any) {
        error(m);
    }
}

export default updateSurvey;

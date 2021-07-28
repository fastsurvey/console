import {types} from '@types';
import {httpGet} from '../http-clients';

async function fetchResults(
    account: types.Account,
    authToken: types.AuthToken,
    centralConfigName: string,
    success: (results: any) => void,
    error: (code: any) => void,
) {
    try {
        const response = await httpGet(
            `/users/${account.username}/surveys/${centralConfigName}/results`,
            authToken,
        ).catch((error: any) => {
            throw error.response.status;
        });

        success(response.data);
    } catch (code) {
        error(code);
    }
}

export default fetchResults;

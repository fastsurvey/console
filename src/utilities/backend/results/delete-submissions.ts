import {types} from '/src/types';
import {httpDelete} from '../http-clients';

async function deleteSubmissions(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    success: () => void,
    error: (detail: 'token' | 'server') => void,
) {
    try {
        await httpDelete(
            `/users/${account.username}/surveys/${centralConfigName}/submissions`,
            accessToken,
        ).catch((error: any) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        // 403 is also a server error, since this should not happen
        error(code === 401 ? 'token' : 'server');
    }
}

export default deleteSubmissions;

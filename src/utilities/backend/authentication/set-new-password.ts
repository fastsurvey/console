import {types} from '/src/types';
import {httpGet, httpPut, throwServerError} from '../http-clients';

async function setNewPassword(
    data: {
        verificationToken: string;
        newPassword: string;
    },
    success: (
        authToken: types.AccessToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ) => void,
    error: (reason: 'invalid-token' | 'server') => void,
) {
    try {
        const {username, access_token: accessToken}: any = (
            await httpPut('/authentication', {
                verification_token: data.verificationToken,
            }).catch((error) => {
                throw error;
            })
        ).data;

        let account: {username: string; email: string} = {
            username,
            email: (await httpGet(`/users/${username}`, accessToken)).data
                .email_address,
        };

        await httpPut(
            `/users/${username}`,
            JSON.stringify({
                username: account.username,
                email_address: account.email,
                password: data.newPassword,
            }),
            accessToken,
        );

        const configs: types.SurveyConfig[] = (
            await httpGet(`/users/${username}/surveys`, accessToken)
        ).data;

        success(accessToken, account, configs);
    } catch (response: any) {
        if (response.status === 401 || response.status === 422) {
            error('invalid-token');
        } else {
            error('server');
            throwServerError({response, verificationToken: data.verificationToken});
        }
    }
}

export default setNewPassword;

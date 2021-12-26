import {types} from '/src/types';
import {httpGet, httpPut} from '../http-clients';

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
    abort: (error: 'invalid-token' | 'server-error') => void,
) {
    try {
        const {username, access_token: accessToken}: any = (
            await httpPut('/authentication', {
                verification_token: data.verificationToken,
            }).catch((error) => {
                if (error.response.status === 401) {
                    throw 'invalid-token';
                } else {
                    throw error;
                }
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
    } catch (error: any) {
        abort(error === 'invalid-token' ? error : 'server-error');
    }
}

export default setNewPassword;

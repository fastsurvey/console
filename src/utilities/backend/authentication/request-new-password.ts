import {httpPost} from '../http-clients';

async function requestNewPassword(
    data: {
        identifier: string;
    },
    success: () => void,
    abort: (statusCode: 400 | 500) => void,
) {
    try {
        await httpPost('/authentication', data).catch((error) => {
            throw error.response.status;
        });
        success();
    } catch (code: any) {
        abort(code === 500 ? 500 : 400);
    }
}

export default requestNewPassword;

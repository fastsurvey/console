import {types} from '/src/types';
import {httpDelete, throwServerError} from '../http-clients';

async function logout(accessToken: types.AccessToken, success: () => void) {
    // a possible error message will only be visible in the
    // browser-console. There is no point in showing the user
    // a message "logout not successful", since the user will
    // then just close the page

    httpDelete('/authentication', accessToken)
        .then(success)
        .catch((error) => {
            success();
            throwServerError({response: error, accessToken});
        });
}

export default logout;

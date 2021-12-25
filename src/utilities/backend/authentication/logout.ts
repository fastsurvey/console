import {types} from '/src/types';
import {httpDelete} from '../http-clients';

async function logout(accessToken: types.AccessToken, handleSuccess: () => void) {
    // a possible error message will only be visible in the browser-console
    // there is no point in showing the user a message "logout not successful",
    // since he will then just close the page
    if (accessToken.length > 0) {
        httpDelete('/authentication', accessToken)
            .then(handleSuccess)
            .catch((error) => {
                handleSuccess();
                throw `Logout from backend not successful: ${error}`;
            });
    }
}

export default logout;

import {types} from '/src/types';
import {httpDelete} from '../http-clients';

async function logout(accessToken: types.AccessToken) {
    // a possible error message will only be visible in the browser-console
    // there is no point in showing the user a message "logout not successful",
    // since he will then just close the page
    if (accessToken.length > 0) {
        try {
            await httpDelete('/authentication', accessToken);
        } catch {}
    }
}

export default logout;

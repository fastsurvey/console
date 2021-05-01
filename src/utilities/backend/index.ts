import loginWithCookie from './login-with-cookie';
import loginWithForm from './login-with-form';
import createSurvey from './create-survey';
import deleteSurvey from './delete-survey';
import updateSurvey from './update-survey';
import {createAccount} from './create-account';

const backend = {
    loginWithCookie,
    loginWithForm,
    createSurvey,
    deleteSurvey,
    updateSurvey,
    createAccount,
};

export default backend;

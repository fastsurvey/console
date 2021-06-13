import loginWithCookie from './login-with-cookie';
import loginWithForm from './login-with-form';
import createSurvey from './create-survey';
import deleteSurvey from './delete-survey';
import updateSurvey from './update-survey';
import createAccount from './create-account';
import verifyAccount from './verify-account';
import fetchResults from './fetch-results';

const backend = {
    loginWithCookie,
    loginWithForm,
    createSurvey,
    deleteSurvey,
    updateSurvey,
    createAccount,
    verifyAccount,
    fetchResults,
};

export default backend;

import loginWithCookie from './authentication/login-with-cookie';
import loginWithForm from './authentication/login-with-form';
import createSurvey from './configuration/create-survey';
import deleteSurvey from './configuration/delete-survey';
import updateSurvey from './configuration/update-survey';
import createAccount from './account/create-account';
import verifyAccount from './account/verify-account';
import updateAccount from './account/update-account';
import fetchResults from './results/fetch-results';

const backend = {
    loginWithCookie,
    loginWithForm,
    createSurvey,
    deleteSurvey,
    updateSurvey,
    createAccount,
    verifyAccount,
    updateAccount,
    fetchResults,
};

export default backend;

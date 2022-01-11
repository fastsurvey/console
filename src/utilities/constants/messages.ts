import {types} from '/src/types';

export const messages: {[key in types.MessageId]: types.Message} = {
    'warning-editor-unsaved': {
        id: 'warning-editor-unsaved',
        randomToken: 0,
        text: 'Please save or undo your progress first',
        type: 'warning',
    },
    'error-access-token': {
        id: 'error-access-token',
        randomToken: 0,
        text: 'Your browser session has ended due to long inactivity. Please reload the page!',
        type: 'error',
    },
    'error-login-credentials': {
        id: 'error-login-credentials',
        randomToken: 0,
        text: 'Invalid credentials',
        type: 'error',
    },
    'warning-login-not-verified': {
        id: 'warning-login-not-verified',
        randomToken: 0,
        text: 'id/password valid, but email not verified yet',
        type: 'warning',
    },
    'error-server': {
        id: 'error-server',
        randomToken: 0,
        text: 'Server error. Please try again later',
        type: 'error',
    },
    'success-register-creation': {
        id: 'success-register-creation',
        randomToken: 0,
        text: 'Success: Account created! Please verify your email now.',
        type: 'success',
    },
    'success-account-password-changed': {
        id: 'success-account-password-changed',
        randomToken: 0,
        text: 'Success: Password has been changed',
        type: 'success',
    },
    'success-account-username-changed': {
        id: 'success-account-username-changed',
        randomToken: 0,
        text: 'Success: Username has been changed',
        type: 'success',
    },
    'warning-register-username-taken': {
        id: 'warning-register-username-taken',
        randomToken: 0,
        text: 'Username is already taken',
        type: 'warning',
    },
    'warning-register-email-taken': {
        id: 'warning-register-email-taken',
        randomToken: 0,
        text: 'Email is already taken',
        type: 'warning',
    },
    'error-link-invalid': {
        id: 'error-link-invalid',
        randomToken: 0,
        text: 'Invalid verification link',
        type: 'error',
    },
    'success-register-verification': {
        id: 'success-register-verification',
        randomToken: 0,
        text: 'Success, email verified!',
        type: 'success',
    },
    'warning-editor-clipboard': {
        id: 'warning-editor-clipboard',
        randomToken: 0,
        text: 'Invalid text format on clipboard',
        type: 'warning',
    },
    'warning-editor-clipboard-support': {
        id: 'warning-editor-clipboard-support',
        randomToken: 0,
        text: 'Copy-Paste is not supported for your browser yet',
        type: 'warning',
    },
    'warning-editor-validators': {
        id: 'warning-editor-validators',
        randomToken: 0,
        text: 'Invalid fields: Please check all red hints',
        type: 'warning',
    },
    'warning-editor-authentication': {
        id: 'warning-editor-authentication',
        randomToken: 0,
        text: 'There can only be one email-field with verify="Yes"',
        type: 'warning',
    },
    'success-survey-list-duplication': {
        id: 'success-survey-list-duplication',
        randomToken: 0,
        text: 'Success: You are now viewing the created copy',
        type: 'success',
    },
    'success-survey-list-submissions-removed': {
        id: 'success-survey-list-submissions-removed',
        randomToken: 0,
        text: 'Success: Submissions have been removed',
        type: 'success',
    },
    'success-survey-list-survey-removed': {
        id: 'success-survey-list-survey-removed',
        randomToken: 0,
        text: 'Success: Survey has been removed',
        type: 'success',
    },
};

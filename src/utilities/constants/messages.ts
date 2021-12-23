import {types} from '/src/types';

export const messages: {[key in types.MessageId]: types.Message} = {
    'warning-unsaved': {
        id: 'warning-unsaved',
        randomToken: 0,
        text: 'Please save or undo your progress first',
        type: 'warning',
    },
    'error-credentials': {
        id: 'error-credentials',
        randomToken: 0,
        text: 'Invalid credentials',
        type: 'error',
    },
    'warning-account-not-verified': {
        id: 'warning-account-not-verified',
        randomToken: 0,
        text: 'id/password valid, but email not verified yet',
        type: 'warning',
    },
    'error-submissions-exist': {
        id: 'error-submissions-exist',
        randomToken: 0,
        text: 'Valid submissions already exist - survey cannot be edited anymore',
        type: 'error',
    },
    'error-server': {
        id: 'error-server',
        randomToken: 0,
        text: 'Server error. Please try again later',
        type: 'error',
    },
    'success-account-created': {
        id: 'success-account-created',
        randomToken: 0,
        text: 'Success: Account created! Please verify your email now.',
        type: 'success',
    },
    'success-password-changed': {
        id: 'success-password-changed',
        randomToken: 0,
        text: 'Success: Password has been changed',
        type: 'success',
    },
    'success-username-changed': {
        id: 'success-username-changed',
        randomToken: 0,
        text: 'Success: Username has been changed',
        type: 'success',
    },
    'error-username-taken': {
        id: 'error-username-taken',
        randomToken: 0,
        text: 'Username already taken',
        type: 'error',
    },
    'error-email-taken': {
        id: 'error-email-taken',
        randomToken: 0,
        text: 'Email is already taken',
        type: 'error',
    },
    'error-email-invalid': {
        id: 'error-email-invalid',
        randomToken: 0,
        text: 'Invalid email address',
        type: 'error',
    },
    'error-link-invalid': {
        id: 'error-link-invalid',
        randomToken: 0,
        text: 'Invalid verification link',
        type: 'error',
    },
    'success-redirect-to-login': {
        id: 'success-redirect-to-login',
        randomToken: 0,
        text: 'Success! Redirect to login in 4 seconds.',
        type: 'success',
    },
    'warning-clipboard': {
        id: 'warning-clipboard',
        randomToken: 0,
        text: 'Invalid text format on clipboard',
        type: 'warning',
    },
    'warning-clipboard-support': {
        id: 'warning-clipboard-support',
        randomToken: 0,
        text: 'Copy-Paste is not supported for your browser yet',
        type: 'warning',
    },
    'editor-warning-validators': {
        id: 'editor-warning-validators',
        randomToken: 0,
        text: 'Invalid fields: Please check all red hints',
        type: 'warning',
    },
    'editor-warning-authentication': {
        id: 'editor-warning-authentication',
        randomToken: 0,
        text: 'There can only be one email-field with verify="Yes"',
        type: 'warning',
    },
    'success-survey-duplicated': {
        id: 'success-survey-duplicated',
        randomToken: 0,
        text: 'Success: You are now viewing the created copy',
        type: 'success',
    },
    'success-submissions-removed': {
        id: 'success-submissions-removed',
        randomToken: 0,
        text: 'Success: Submissions have been removed',
        type: 'success',
    },
    'success-survey-removed': {
        id: 'success-survey-removed',
        randomToken: 0,
        text: 'Success: Survey has been removed',
        type: 'success',
    },
};

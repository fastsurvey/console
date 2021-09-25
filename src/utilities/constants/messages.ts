import {types} from '@types';

export const messages: {[key in types.MessageId]: types.Message} = {
    'warning-unsaved': {
        id: 'warning-unsaved',
        text: 'Please save or undo your progress first',
        type: 'warning',
    },
    'error-credentials': {
        id: 'error-credentials',
        text: 'Invalid credentials',
        type: 'error',
    },
    'warning-account-not-verified': {
        id: 'warning-account-not-verified',
        text: 'id/password valid, but email not verified yet',
        type: 'warning',
    },
    'error-submissions-exist': {
        id: 'error-submissions-exist',
        text: 'Valid submissions already exist - survey cannot be edited anymore',
        type: 'error',
    },
    'error-server': {
        id: 'error-server',
        text: 'Server error. Please try again later',
        type: 'error',
    },
    'success-account-created': {
        id: 'success-account-created',
        text: 'Success: Account created! Please verify your email now.',
        type: 'success',
    },
    'success-password-changed': {
        id: 'success-password-changed',
        text: 'Success: Password has been changed',
        type: 'success',
    },
    'error-email-taken': {
        id: 'error-email-taken',
        text: 'Email format invalid or email is already taken',
        type: 'error',
    },
    'error-email-invalid': {
        id: 'error-email-invalid',
        text: 'Invalid email address',
        type: 'error',
    },
    'error-link-invalid': {
        id: 'error-link-invalid',
        text: 'Invalid verification Link',
        type: 'error',
    },
    'success-redirect-to-login': {
        id: 'success-redirect-to-login',
        text: 'Success! Redirect to login in 4 seconds.',
        type: 'success',
    },
    'warning-clipboard': {
        id: 'warning-clipboard',
        text: 'Invalid text format on clipboard',
        type: 'warning',
    },
    'editor-warning-validators': {
        id: 'editor-warning-validators',
        text: 'Invalid fields: Please check all red hints',
        type: 'warning',
    },
    'editor-warning-field-count': {
        id: 'editor-warning-validators',
        text: 'There has to be at least one field',
        type: 'warning',
    },
    'editor-warning-authentication': {
        id: 'editor-warning-authentication',
        text: 'Email-authentication requires unique email field',
        type: 'warning',
    },
    'success-survey-duplicated': {
        id: 'success-survey-duplicated',
        text: 'Success: You are now viewing the created copy',
        type: 'success',
    },
    'success-survey-removed': {
        id: 'success-survey-removed',
        text: 'Success: Survey has been removed',
        type: 'success',
    },
};

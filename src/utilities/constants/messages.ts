import {types} from 'types';

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
    'error-email-taken': {
        id: 'error-email-taken',
        text: 'Email is already taken',
        type: 'error',
    },
    'error-email-invalid': {
        id: 'error-email-invalid',
        text: 'Invalid email address',
        type: 'error',
    },
    'error-link-invalid': {
        id: 'error-link-invalid',
        text: 'Wrong password or invalid Link',
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
    'editor-error-validators': {
        id: 'editor-error-validators',
        text: 'Invalid fields: Please check all red hints',
        type: 'error',
    },
    'editor-error-field-count': {
        id: 'editor-error-validators',
        text: 'There has to be at least one field',
        type: 'error',
    },
    'editor-error-timing': {
        id: 'editor-error-timing',
        text: 'End time has to be after start time',
        type: 'error',
    },
    'editor-error-authentication': {
        id: 'editor-error-authentication',
        text: 'Email-authentication requires unique email field',
        type: 'error',
    },
    'editor-error-option-list': {
        id: 'editor-error-option-list',
        text: 'Radio/Selection fields require at least 2 options',
        type: 'error',
    },
};

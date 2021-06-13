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
};

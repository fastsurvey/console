import {EmailRegexSetup, FieldOption} from '../../../../utilities/types';
const AUTH_MODE = [
    {value: 0, label: 'No Authentication'},
    {value: 1, label: 'Email Verification'},
];

const MONTHS = [
    {value: 0, label: 'January'},
    {value: 1, label: 'February'},
    {value: 2, label: 'March'},
    {value: 3, label: 'April'},
    {value: 4, label: 'May'},
    {value: 5, label: 'June'},
    {value: 6, label: 'July'},
    {value: 7, label: 'August'},
    {value: 8, label: 'September'},
    {value: 9, label: 'October'},
    {value: 10, label: 'November'},
    {value: 11, label: 'December'},
];

const YEARS = [
    {value: 120, label: '2020'},
    {value: 121, label: '2021'},
    {value: 122, label: '2022'},
    {value: 123, label: '2023'},
    {value: 124, label: '2024'},
    {value: 125, label: '2025'},
];

const HOURS = [...Array(24).keys()].map((i) => {
    return {label: i.toString(), value: i};
});

const MINUTES = [...Array(60).keys()].map((i) => {
    return {label: i.toString(), value: i};
});

const EMAIL_REGEX: EmailRegexSetup[] = [
    {
        label: 'Any Email',
        value: 0,
        regex: '.*',
        hint: 'Any email address',
    },
    {
        label: 'Unique @mytum.de Email',
        value: 1,
        regex: '[a-z]{2}[0-9]{2}[a-z]{3}@mytum.de',
        hint: '<LRZ-signature>@mytum.de (e.g. ab12cde@mytum.de), lowercase',
    },
];

export const FORM_OPTIONS = {
    AUTH_MODE,
    MONTHS,
    YEARS,
    HOURS,
    MINUTES,
    EMAIL_REGEX,
};

const NEW_FIELD_OPTION: FieldOption = {
    local_id: 0,
    title: '',
    description: '',
    mandatory: false,
};

export const TEMPLATES = {NEW_FIELD_OPTION};

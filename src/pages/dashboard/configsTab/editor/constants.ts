import {FieldOption} from '../../../../utilities/types';
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

export const FORM_OPTIONS = {
    AUTH_MODE,
    MONTHS,
    YEARS,
    HOURS,
    MINUTES,
};

const NEW_FIELD_OPTION: FieldOption = {
    local_id: 0,
    title: '',
    description: '',
    mandatory: false,
};

export const TEMPLATES = {NEW_FIELD_OPTION};

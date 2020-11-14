export const AUTH_MODE = [
    {value: 0, label: 'No Authentication'},
    {value: 1, label: 'Email Verification'},
];

export const DAYS = [...Array(31).keys()].map((i) => {
    return {label: (i + 1).toString(), value: i + 1};
});

export const MONTHS = [
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

export const YEARS = [
    {value: 120, label: '2020'},
    {value: 121, label: '2021'},
    {value: 122, label: '2022'},
    {value: 123, label: '2023'},
    {value: 124, label: '2024'},
    {value: 125, label: '2025'},
];

export const HOURS = [...Array(24).keys()].map((i) => {
    return {label: i.toString(), value: i};
});

export const MINUTES = [...Array(60).keys()].map((i) => {
    return {label: i.toString(), value: i};
});

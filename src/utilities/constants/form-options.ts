export const formOptions = {
    AUTH_MODE: [
        {value: 0, label: 'No Authentication'},
        {value: 1, label: 'Email Verification'},
    ],

    MONTHS: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    YEARS: [
        {value: 2020, label: '2020'},
        {value: 2021, label: '2021'},
        {value: 2022, label: '2022'},
        {value: 2023, label: '2023'},
        {value: 2024, label: '2024'},
        {value: 2025, label: '2025'},
    ],
    HOURS: [...Array(24).keys()].map((i) => {
        return {label: i.toString(), value: i};
    }),
    MINUTES: [...Array(60).keys()].map((i) => {
        return {label: i.toString(), value: i};
    }),
    EMAIL_REGEX: [
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
    ],
};

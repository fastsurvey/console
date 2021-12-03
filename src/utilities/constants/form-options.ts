export const formOptions = {
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
    EMAIL_REGEX: [
        {
            label: 'Any Email',
            value: 0,
            regex: '.*',
            hint: 'Any email address',
        },
        {
            label: 'Unique @example.com Email',
            value: 1,
            regex: '[a-z0-9]+@example.com',
            hint: '<username>@example.com (e.g. ab12cde@example.com), lowercase',
        },
    ],
};

import {types} from '@types';

export const surveyName = (configs: types.SurveyConfig[]): string => {
    const adjectives = [
        'horny',
        'mellow',
        'enthusiastic',
        'mental',
        'abnormal',
        'dead',
        'bearded',
        'sketchy',
        'impressive',
        'naked',
        'drugged',
        'disrespectful',
        'duck-like',
        'magical',
        'hilarious',
    ];
    const names = [
        'fellow',
        'duck',
        'pigeon',
        'penguin',
        'gnu',
        'crocodile',
        'zuck',
        'turle',
        'rectum',
        'lizard',
        'chicken',
        'armadillo',
    ];

    const aIndex = Math.floor(Math.random() * adjectives.length);
    const nIndex = Math.floor(Math.random() * names.length);
    let creation = `${adjectives[aIndex]}-${names[nIndex]}`;
    const configNames: string[] = configs.map((c) => c.survey_name);

    if (!configNames.includes(creation)) {
        return creation;
    }

    let appendix: number = 1;
    while (configNames.includes(`${creation}-${appendix}`)) {
        appendix++;
    }
    return `${creation}-${appendix}`;
};

export default surveyName;

import React from 'react';
import {types} from '@types';
import VisualTimePill from './visual-time-pill';

const diffToPhrase = (diff: number): string => {
    const ranges: any = [
        [31536000, 'year'],
        [2628000, 'month'],
        [86400, 'day'],
        [3600, 'hour'],
        [60, 'minute'],
        [1, 'second'],
    ];

    for (let i = 0; i < 6; i++) {
        if (diff > ranges[i][0]) {
            const n = Math.floor(diff / ranges[i][0]);
            return `${n} ${ranges[i][1]}` + (n > 1 ? 's' : '');
        }
    }

    return '1 second';
};

function TimePill(props: {config: types.SurveyConfig; flat: boolean}) {
    const now: number = new Date().getTime() / 1000;
    const {start, end, draft} = props.config;

    let phrase: string;
    let variant: 'draft' | 'pending' | 'running' | 'finished';

    if (draft) {
        phrase = 'Draft';
        variant = 'draft';
    } else if (start > now) {
        phrase = `Starting in ${diffToPhrase(start - now)}`;
        variant = 'pending';
    } else if (end > now) {
        phrase = `Ending in ${diffToPhrase(end - now)}`;
        variant = 'running';
    } else {
        phrase = `Ended ${diffToPhrase(now - end)} ago`;
        variant = 'finished';
    }

    return <VisualTimePill {...{variant, phrase}} flat={props.flat} />;
}

export default TimePill;

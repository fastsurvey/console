import React from 'react';
import {types} from '/src/types';
import PercentageBarRow from './percentage-bar-row';

export default function OptionSummary(props: {
    fieldConfig: types.SurveyField;
    fieldResults: number;
    count: number;
}) {
    const {fieldResults, fieldConfig, count} = props;
    return (
        <>
            <PercentageBarRow
                index={0}
                total={count}
                count={fieldResults}
                title={'Yes'}
                variant='green'
            />
            <PercentageBarRow
                index={1}
                total={count}
                count={count - fieldResults}
                title={'No'}
                variant='red'
            />
        </>
    );
}

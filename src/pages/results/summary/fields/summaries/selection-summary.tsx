import React from 'react';
import {types} from '@types';
import PercentageBarRow from '../percentage-bar-row';

export default function SelectionSummary(props: {
    fieldConfig: types.SelectionField;
    fieldResults: any;
    count: number;
}) {
    return (
        <>
            {props.fieldConfig.options.map((option) => (
                <PercentageBarRow
                    total={props.count}
                    count={props.fieldResults[option.title]}
                    title={option.title}
                />
            ))}
        </>
    );
}

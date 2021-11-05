import React from 'react';
import {types} from '/src/types';
import PercentageBarRow from '../percentage-bar-row';

export default function ChoiceSummary(props: {
    fieldConfig: types.SelectionField;
    fieldResults: any;
    count: number;
}) {
    return (
        <>
            {props.fieldConfig.options.map((option, index) => (
                <PercentageBarRow
                    key={index}
                    total={props.count}
                    count={props.fieldResults[option.title]}
                    title={option.title}
                />
            ))}
        </>
    );
}

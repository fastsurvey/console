import React from 'react';
import {types} from '/src/types';
import PercentageBarRow from './percentage-bar-row';

export default function SelectionResults(props: {
    fieldConfig: types.SelectionField;
    fieldResult: types.FieldResult;
}) {
    return (
        <>
            {props.fieldConfig.options.map((option, index) => (
                <PercentageBarRow
                    key={index}
                    index={index}
                    total={props.fieldResult.count}
                    count={
                        props.fieldResult.value
                            ? props.fieldResult.value[option.title]
                            : 0
                    }
                    title={option.title}
                />
            ))}
        </>
    );
}

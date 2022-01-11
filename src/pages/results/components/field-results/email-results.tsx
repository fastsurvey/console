import React from 'react';
import {types} from '/src/types';
import PercentageBarRow from './percentage-bar-row';

export default function EmailResults(props: {
    fieldConfig: types.EmailField;
    fieldResult: types.FieldResult;
}) {
    return (
        <>
            <PercentageBarRow
                index={0}
                total={props.fieldResult.count}
                count={props.fieldResult.verified}
                title='Verified emails'
            />
            <PercentageBarRow
                index={1}
                total={props.fieldResult.count}
                count={
                    props.fieldResult.count -
                    (props.fieldResult.verified ? props.fieldResult.verified : 0)
                }
                title='Unverified emails'
            />
        </>
    );
}

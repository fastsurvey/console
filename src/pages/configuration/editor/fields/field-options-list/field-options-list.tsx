import React, {useEffect, useRef, useState} from 'react';
import {animateScroll} from 'react-scroll';
import {configTypes, optionTemplate} from 'utilities';
import VisualFieldOptionsList from './visual-field-options-list';

interface Props {
    fieldConfig: configTypes.RadioField | configTypes.SelectionField;
    updateFieldConfig(
        fieldConfig: configTypes.RadioField | configTypes.SelectionField,
    ): void;
    disabled: boolean;
}
function FieldOptionsList(props: Props) {
    const [optionsVisible, setOptionsVisible] = useState(
        props.fieldConfig.fields.map(() => true),
    );
    useEffect(
        () => setOptionsVisible(props.fieldConfig.fields.map(() => true)),
        [props.fieldConfig.fields],
    );

    const nextRowRef: any = useRef(null);
    const [newOption, setNewOption] = useState('');

    function addFieldOption() {
        nextRowRef.current?.blur();
        optionsVisible.push(true);

        props.updateFieldConfig(optionTemplate(newOption, props.fieldConfig));

        // Suitable for 1rem = 16px
        animateScroll.scrollMore(56, {duration: 150});

        setNewOption('');
    }

    return (
        <VisualFieldOptionsList
            fieldConfig={props.fieldConfig}
            updateFieldConfig={props.updateFieldConfig}
            disabled={props.disabled}
            setOptionsVisible={setOptionsVisible}
            optionsVisible={optionsVisible}
            newOption={newOption}
            setNewOption={setNewOption}
            addFieldOption={addFieldOption}
        />
    );
}

export default FieldOptionsList;

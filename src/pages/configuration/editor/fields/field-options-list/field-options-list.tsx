import React, {useEffect, useRef, useState} from 'react';
import {animateScroll} from 'react-scroll';
import {templateUtils} from 'utilities';
import VisualFieldOptionsList from './visual-field-options-list';
import {types} from 'types';

interface Props {
    fieldConfig: types.RadioField | types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
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

        props.setLocalFieldConfig(
            templateUtils.option(newOption, props.fieldConfig),
        );

        // Suitable for 1rem = 16px
        animateScroll.scrollMore(56, {duration: 150});

        setNewOption('');
    }

    return (
        <VisualFieldOptionsList
            fieldConfig={props.fieldConfig}
            setLocalFieldConfig={props.setLocalFieldConfig}
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

import React, {useState} from 'react';
import {types} from '/src/types';
import Field from '../../fields/field';
import '/src/styles/tailwind.out.css';

export function FieldStateWrapper(props: {
    initialFieldConfig: types.SurveyField;
    validation: types.ValidationResult;
    fieldIndex: number;
    disabled: boolean;
}) {
    const [fieldConfig, setFieldConfig] = useState(props.initialFieldConfig);
    const [mounted, setMounted] = useState(true);

    return (
        <div className='w-full h-full px-6 py-12 bg-gray-100'>
            {mounted && (
                <Field
                    configIsDiffering={true}
                    disabled={props.disabled}
                    identifierToOrder={{[fieldConfig.identifier]: props.fieldIndex + 1}}
                    fieldIndex={props.fieldIndex}
                    localFieldConfig={fieldConfig}
                    setLocalFieldConfig={(
                        fieldConfigChanges: types.SurveyFieldChange,
                    ) => setFieldConfig({...fieldConfig, ...fieldConfigChanges})}
                    validation={props.validation}
                    removeField={() => setMounted(false)}
                />
            )}
        </div>
    );
}

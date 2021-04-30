import React from 'react';
import {formatters, hints} from 'utilities';
import {TextInput, EditorFormRow} from 'components';
import {types} from 'types';

interface Props {
    fieldConfig: types.TextField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function VisualTextSettings(props: Props) {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <>
            <EditorFormRow label='Min. Characters' className='mb-1'>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.min_chars.toString()}
                    onChange={(newValue: string) =>
                        props.setLocalFieldConfig({
                            min_chars: formatters.atoi(newValue),
                        })
                    }
                    hint={{
                        ...hints.minChars(props.fieldConfig),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
            <EditorFormRow label='Max. Characters' className='mb-1'>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.max_chars.toString()}
                    onChange={(newValue: string) =>
                        props.setLocalFieldConfig({
                            max_chars: formatters.atoi(newValue),
                        })
                    }
                    hint={{
                        ...hints.maxChars(props.fieldConfig),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
        </>
    );
}

export default VisualTextSettings;

import React from 'react';
import {configTypes, hints} from 'utilities';
import {VisualTextInputRow} from 'components';

interface VisualTextSettingsProps {
    fieldConfig: configTypes.TextField;
    updateFieldConfig(fieldConfig: configTypes.TextField): void;
    disabled: boolean;
}
function VisualTextSettings(props: VisualTextSettingsProps) {
    const commonProps = {
        config: props.fieldConfig,
        disabled: props.disabled,
        updateConfig: props.updateFieldConfig,
        wrapperClassName: 'w-28',
    };

    return (
        <div className='flex flex-row gap-x-8'>
            <VisualTextInputRow
                {...commonProps}
                label='Min. Characters'
                value={props.fieldConfig.min_chars.toString()}
                onChange={(newValue: string) => ({
                    min_chars: newValue.length > 0 ? parseInt(newValue) : 0,
                })}
                hint={hints.minChars(props.fieldConfig)}
            />
            <VisualTextInputRow
                {...commonProps}
                label='Max. Characters'
                value={props.fieldConfig.max_chars.toString()}
                onChange={(newValue: string) => ({
                    max_chars: newValue.length > 0 ? parseInt(newValue) : 0,
                })}
                hint={hints.maxChars(props.fieldConfig)}
            />
        </div>
    );
}

export default VisualTextSettings;

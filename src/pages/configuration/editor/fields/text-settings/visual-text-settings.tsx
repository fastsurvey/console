import React from 'react';
import {configTypes, hints} from 'utilities';
import {TextInput} from 'components';

interface VisualTextSettingsProps {
    fieldConfig: configTypes.TextField;
    updateFieldConfig(fieldConfig: configTypes.TextField): void;
    disabled: boolean;
}
function VisualTextSettings(props: VisualTextSettingsProps) {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'w-28',
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row items-start mr-8'>
                <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                    Min. Characters:
                </div>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.min_chars.toString()}
                    onChange={(newValue: string) =>
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            min_chars:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })
                    }
                    hint={hints.minChars(props.fieldConfig)}
                />
            </div>
            <div className='flex flex-row items-start mr-8'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Max. Characters:
                </div>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.max_chars.toString()}
                    onChange={(newValue: string) =>
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            max_chars:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })
                    }
                    hint={hints.maxChars(props.fieldConfig)}
                />
            </div>
        </div>
    );
}

export default VisualTextSettings;

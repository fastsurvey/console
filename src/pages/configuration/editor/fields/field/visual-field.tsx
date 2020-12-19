import React from 'react';
import {configTypes, hints} from 'utilities';
import {icons} from 'assets';
import {TextArea, TextInput} from 'components';

interface Props {
    fieldConfig: configTypes.SurveyField;
    disabled: boolean;
    setFieldConfig(fieldConfig: configTypes.SurveyField): void;
    updateFieldConfig(fieldConfig: configTypes.SurveyField): void;
    children: React.ReactNode;
}
function VisualField(props: Props) {
    const commonInputProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'self-stretch flex-grow mr-2',
    };

    return (
        <div className={'w-full bg-white shadow rounded flex flex-col mb-8'}>
            <div
                className={'w-full border-gray-300 flex flex-row'}
                style={{borderBottomWidth: '2px'}}
            >
                <div className={'flex flex-row w-40'}>
                    <div
                        className={
                            'bg-gray-300 rounded-tl rounded-br h-10 leading-10 font-weight-700 text-xl flex flex-row'
                        }
                    >
                        <div className='w-10 h-10 p-2 cursor-move'>
                            {icons.drag}
                        </div>
                        <div className='pr-4'>{props.fieldConfig.type}</div>
                    </div>
                </div>
                <div className='flex flex-col self-stretch flex-grow'>
                    <div
                        className='flex flex-row items-start w-full pt-2 '
                        style={{paddingBottom: 'calc(0.5rem + 2px)'}}
                    >
                        <div className='h-12 mx-3 text-xl text-right w-28 leading-12 font-weight-600'>
                            Title:
                        </div>
                        <TextInput
                            {...commonInputProps}
                            value={props.fieldConfig.title}
                            onChange={(newValue: string) =>
                                props.updateFieldConfig({
                                    ...props.fieldConfig,
                                    title: newValue,
                                })
                            }
                            placeholder='The title of your survey'
                            hint={hints.title(props.fieldConfig.title)}
                        />
                    </div>
                    <div
                        className='flex flex-row items-start w-full'
                        style={{paddingBottom: 'calc(0.25rem - 2px)'}}
                    >
                        <div className='h-12 mx-3 text-xl text-right w-28 font-weight-600 leading-12'>
                            Description:
                        </div>
                        <TextArea
                            {...commonInputProps}
                            rows={2}
                            value={props.fieldConfig.description}
                            onChange={(newValue: string) =>
                                props.updateFieldConfig({
                                    ...props.fieldConfig,
                                    description: newValue,
                                })
                            }
                            charLimits={{min: 0, max: 2000}}
                        />
                    </div>
                </div>
            </div>
            <div className={'w-full p-2'}>{props.children}</div>
        </div>
    );
}

export default VisualField;

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
        wrapperClassName: 'w-85%',
    };

    return (
        <div
            className={
                'w-full border-l-4 border-emerald-300 my-4 shadow-md bg-white rounded-tl rounded-r overflow-hidden'
            }
        >
            <div className={'w-full flex flex-row'}>
                <div className={'flex flex-row w-15%'}>
                    <div
                        className={
                            'bg-emerald-300 text-emerald-800 rounded-br h-10 leading-10 font-weight-700 text-xl flex flex-row'
                        }
                    >
                        <div className='w-10 h-10 p-2 opacity-50 cursor-not-allowed'>
                            {icons.drag}
                        </div>
                        <div className='pr-3'>{props.fieldConfig.type}</div>
                    </div>
                </div>
                <div className='flex flex-col w-85% p-2'>
                    <div className='flex flex-row items-start w-full '>
                        <div className='h-12 mx-3 text-xl text-right w-15% leading-12 font-weight-600'>
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
                        className='flex flex-row items-start w-full mb-8'
                        style={{paddingBottom: 'calc(0.25rem - 2px)'}}
                    >
                        <div className='h-12 mx-3 text-xl text-right w-15% font-weight-600 leading-12'>
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
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default VisualField;

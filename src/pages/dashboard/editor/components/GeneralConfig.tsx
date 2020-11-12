import React from 'react';
import DropDown from '../../../../components/formFields/DropDown';
import TextArea from '../../../../components/formFields/TextArea';
import TextInput from '../../../../components/formFields/TextInput';
import {SurveyConfig} from '../../../../utilities/types';

const DAYS = [...Array(31).keys()].map((i) => {
    return {label: (i + 1).toString(), value: i + 1};
});
const MONTHS = [
    {value: 0, label: 'January'},
    {value: 1, label: 'February'},
    {value: 2, label: 'March'},
    {value: 3, label: 'April'},
    {value: 4, label: 'May'},
    {value: 5, label: 'June'},
    {value: 6, label: 'July'},
    {value: 7, label: 'August'},
    {value: 8, label: 'September'},
    {value: 9, label: 'October'},
    {value: 10, label: 'November'},
    {value: 11, label: 'December'},
];
const YEARS = [
    {value: 120, label: '2020'},
    {value: 121, label: '2021'},
    {value: 122, label: '2022'},
    {value: 123, label: '2023'},
    {value: 124, label: '2024'},
    {value: 125, label: '2025'},
];
const HOURS = [...Array(24).keys()].map((i) => {
    return {label: i.toString(), value: i};
});
const MINUTES = [...Array(60).keys()].map((i) => {
    return {label: i.toString(), value: i};
});

interface GeneralConfigProps {
    config: SurveyConfig;
}

function GeneralConfig(props: GeneralConfigProps) {
    return (
        <div className='flex flex-col w-full min-h-full mt-24'>
            <div className='flex flex-row mb-4'>
                <div className='flex flex-row items-start w-1/2 pr-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Title:
                    </div>
                    <TextInput
                        value={props.config.title}
                        onChange={() => {}}
                        flat
                        wrapperClassName='self-stretch flex-grow'
                        placeholder='The title of your survey'
                        hint={{
                            text:
                                'Not empty, max. 120 characters ' +
                                `(${120 - props.config.title.length} left)`,
                            fulfilled:
                                1 <= props.config.title.length &&
                                props.config.title.length <= 120,
                        }}
                    />
                </div>
                <div className='flex flex-row items-start w-1/2 pl-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Identifier:
                    </div>
                    <TextInput
                        value={props.config.survey_name}
                        onChange={() => {}}
                        flat
                        wrapperClassName='self-stretch flex-grow'
                        placeholder='URL conform identifier'
                        hint={{
                            text:
                                'URL-conform, 3-120 ' +
                                `characters (${
                                    120 - props.config.title.length
                                } left)`,
                            fulfilled:
                                props.config.survey_name.match(
                                    /^[a-zA-Z0-9-_]*$/,
                                ) !== null &&
                                3 <= props.config.title.length &&
                                props.config.title.length <= 120,
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-row items-start w-full'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Description:
                </div>
                <TextArea
                    value={props.config.title}
                    onChange={() => {}}
                    flat
                    charLimits={{min: 0, max: 500}}
                    className='leading-8'
                    wrapperClassName='self-stretch flex-grow'
                />
            </div>
            <div className='flex flex-row items-start w-full'>
                <div className='h-12 text-xl leading-12 font-weight-600'>
                    Date:
                </div>
                <div className='w-20 mx-2'>
                    <DropDown value={3} onChange={() => {}} options={DAYS} />
                </div>
                <div className='h-12 text-xl leading-12 font-weight-600'>.</div>
                <div className='mx-2 w-42'>
                    <DropDown value={3} onChange={() => {}} options={MONTHS} />
                </div>
                <div className='h-12 text-xl leading-12 font-weight-600'>.</div>
                <div className='ml-2 mr-10 w-28'>
                    <DropDown value={123} onChange={() => {}} options={YEARS} />
                </div>
                <div className='h-12 text-xl leading-12 font-weight-600'>
                    Time:
                </div>
                <div className='w-20 mx-2'>
                    <DropDown value={16} onChange={() => {}} options={HOURS} />
                </div>
                <div className='h-12 text-xl leading-12 font-weight-600'>:</div>
                <div className='w-20 ml-2'>
                    <DropDown
                        value={20}
                        onChange={() => {}}
                        options={MINUTES}
                    />
                </div>
            </div>
        </div>
    );
}

export default GeneralConfig;

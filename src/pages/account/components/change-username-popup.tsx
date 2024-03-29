import React from 'react';
import {Button} from '/src/components';

interface Props {
    oldUsername: string;
    newUsername: string;
    cancel(): void;
    submit(): void;
}
export default function ChangeUsernamePopup(props: Props) {
    return (
        <div className='w-full p-3 pt-1 flex-col-center gap-y-2 '>
            <div className='w-full px-3 text-base text-justify text-gray-800 font-weight-500'>
                <p className='mb-4'>
                    Caution - the{' '}
                    <strong>links to all of your surveys will change</strong>
                </p>
                <div className='w-full mb-2 flex-row-center whitespace-nowrap gap-x-2'>
                    <span className='w-10'>Old:</span>{' '}
                    <div
                        className={
                            'flex-grow p-2 overflow-x-scroll text-sm ' +
                            'rounded whitespace-nowrap bg-gray-100 ' +
                            'text-blue-500 underline font-weight-500'
                        }
                    >
                        fastsurvey.de/
                        <span className='font-weight-700'>{props.oldUsername}</span>/
                        {'<survey-id>'}
                    </div>
                </div>
                <div className='w-full mb-2 flex-row-center whitespace-nowrap gap-x-2'>
                    <span className='w-10'>New:</span>{' '}
                    <div
                        className={
                            'flex-grow p-2 overflow-x-scroll text-sm ' +
                            'rounded whitespace-nowrap bg-gray-100 pr-4 ' +
                            'text-blue-500 underline font-weight-500'
                        }
                    >
                        fastsurvey.de/
                        <span className='font-weight-700'>{props.newUsername}</span>/
                        {'<survey-id>'}
                    </div>
                </div>
            </div>
            <div className='w-full flex-row-right gap-x-2'>
                <Button
                    text='cancel'
                    variant='flat-light-red'
                    onClick={props.cancel}
                    data-cy='button-cancel-username'
                />
                <Button
                    text='confirm'
                    variant='flat-light-blue'
                    onClick={props.submit}
                    data-cy='button-submit-username'
                />
            </div>
        </div>
    );
}

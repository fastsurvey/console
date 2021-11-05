import React from 'react';
import {Button} from '/src/components';

interface Props {
    cancel(): void;
    submit(): void;
}
export default function DeleteUserPopup(props: Props) {
    return (
        <div className='w-full p-3 pt-1 flex-col-center gap-y-2 '>
            <div className='w-full px-3 text-base text-justify text-gray-800 font-weight-500'>
                You will not be able to recovery your account after doing this.
            </div>
            <div className='w-full flex-row-right gap-x-2'>
                <Button
                    text='cancel'
                    variant='flat-light-red'
                    onClick={props.cancel}
                />
                <Button
                    text='confirm'
                    variant='flat-light-blue'
                    onClick={props.submit}
                />
            </div>
        </div>
    );
}

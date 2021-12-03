import React from 'react';
import {Button} from '/src/components';

interface Props {
    closeModal(): void;
    resetSubmissions(): void;
}
function ResetSubmissionsPopup(props: Props) {
    return (
        <div className='w-full p-3 pt-1 flex-col-center gap-y-2 '>
            <div className='px-3 text-justify text-gray-800 text-md font-weight-500'>
                The survey will stay the same, but all{' '}
                <strong>submissions will be removed</strong>
                and you will not be able to restore these anymore. You might want to
                download the existing submissions first.
            </div>
            <div className='w-full flex-row-right gap-x-2'>
                <Button
                    text='cancel'
                    variant='flat-light-blue'
                    onClick={props.closeModal}
                    data-cy='button-cancel-remove'
                />
                <Button
                    text='remove survey'
                    variant='flat-light-blue'
                    onClick={props.resetSubmissions}
                    data-cy='button-submit-remove'
                />
            </div>
        </div>
    );
}

export default ResetSubmissionsPopup;

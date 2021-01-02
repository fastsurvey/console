import React from 'react';
import {ModalButton} from 'components';

interface Props {
    closeModal(): void;
    removeSurvey(): void;
}
function RemoveSurveyPopup(props: Props) {
    return (
        <div className='flex flex-col mt-1 w-96'>
            <div className='px-3 text-justify text-gray-800 text-md font-weight-500'>
                All <strong>submissions will be removed as well</strong> and you
                will not be able to restore this survey anymore. If you want to
                keep the submissions,{' '}
                <strong>you can also archive this survey.</strong>
            </div>
            <div className='flex flex-row justify-center w-full mt-4 gap-x-2'>
                <ModalButton
                    label='Cancel'
                    color='red-light'
                    onClick={props.closeModal}
                />
                <ModalButton label='Remove' onClick={props.removeSurvey} />
            </div>
        </div>
    );
}

export default RemoveSurveyPopup;

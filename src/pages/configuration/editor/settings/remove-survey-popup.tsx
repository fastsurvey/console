import React from 'react';
import {ModalButton} from 'components';

interface Props {
    closeModal(): void;
    removeSurvey(): void;
}
function RemoveSurveyPopup(props: Props) {
    return (
        <div className='flex flex-row justify-center w-full mt-1 gap-x-2'>
            <ModalButton
                label='Cancel'
                color='red-light'
                onClick={props.closeModal}
            />
            <ModalButton label='Remove' onClick={props.removeSurvey} />
        </div>
    );
}

export default RemoveSurveyPopup;

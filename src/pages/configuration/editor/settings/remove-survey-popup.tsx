import React from 'react';
import {IconButton} from 'components';

interface Props {
    closeModal(): void;
    removeSurvey(): void;
}
function RemoveSurveyPopup(props: Props) {
    return (
        <>
            <div className='px-3 text-justify text-gray-800 text-md font-weight-500'>
                All <strong>submissions will be removed as well</strong> and you
                will not be able to restore this survey anymore.
            </div>
            <div className='w-full flex-row-right gap-x-2'>
                <IconButton
                    text='Cancel'
                    variant='flat-light-blue'
                    onClick={props.closeModal}
                />
                <IconButton
                    text='Remove Survey'
                    variant='flat-light-blue'
                    onClick={props.removeSurvey}
                />
            </div>
        </>
    );
}

export default RemoveSurveyPopup;

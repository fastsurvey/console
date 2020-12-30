import React from 'react';
import icons from 'assets/icons/icons';
import AddFieldButton from './add-field-button';

interface Props {}
function AddFieldPanel(props: Props) {
    return (
        <div
            className={
                'w-full group gap-x-2 ' +
                'h-8 hover:h-10 hover:my-2 ' +
                'transition-size duration-200 ' +
                'flex flex-row items-center justify-center '
            }
        >
            <AddFieldButton label='add field' icon={icons.addBox} />
            <AddFieldButton label='paste field' icon={icons.widgets} leftIcon />
        </div>
    );
}

export default AddFieldPanel;

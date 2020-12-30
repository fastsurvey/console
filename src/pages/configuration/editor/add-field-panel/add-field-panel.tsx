import React, {useState} from 'react';
import icons from 'assets/icons/icons';
import AddFieldButton from './add-field-button';
import AddFieldPopup from './add-field-popup';
import {configTypes} from 'utilities';

interface Props {
    insertField(fieldType: configTypes.FieldType): void;
}
function AddFieldPanel(props: Props) {
    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <div
                className={
                    'fixed top-0 left-0 z-40 w-full h-full bg-gray-800 transition-opacity duration-400 ' +
                    (popupOpen ? 'opacity-40' : 'opacity-0 pointer-events-none')
                }
            />

            <div
                className={
                    'relative w-full group gap-x-2 ' +
                    'h-10 my-1 ' +
                    'transition-size duration-400 ' +
                    'flex flex-row items-center justify-center '
                }
                onMouseLeave={() => setPopupOpen(false)}
            >
                <AddFieldButton
                    label='add field'
                    icon={icons.addBox}
                    onClick={() => setPopupOpen(true)}
                />
                <AddFieldPopup
                    open={popupOpen}
                    insertField={(fieldType: configTypes.FieldType) => {
                        setPopupOpen(false);
                        props.insertField(fieldType);
                    }}
                />
            </div>
        </>
    );
}

export default AddFieldPanel;

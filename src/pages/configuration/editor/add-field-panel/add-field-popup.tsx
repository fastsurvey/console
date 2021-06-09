import React from 'react';
import {styleUtils} from 'utilities';
import {types} from 'types';

interface Props {
    insertField(fieldType: types.FieldType): void;
}
function AddFieldPopup(props: Props) {
    const fields: types.FieldType[] = [
        'email',
        'option',
        'radio',
        'selection',
        'text',
    ];
    return (
        <div className='p-1.5 w-60 centering-col gap-y-2'>
            {fields.map((fieldType: types.FieldType) => (
                <button
                    key={fieldType}
                    className={
                        'w-full flex-row-left ' +
                        'text-lg leading-10 font-weight-600 rounded ' +
                        'ring-[2.5px] ring-transparent hover:ring-blue-200 ' +
                        'focus:outline-none focus:ring-blue-200 ' +
                        styleUtils.color.fieldTypeToClasses(fieldType)
                    }
                    onClick={() => props.insertField(fieldType)}
                >
                    <div className='w-10 h-10 p-2 mx-1'>
                        {styleUtils.icons.fieldTypeToIcon(fieldType)}
                    </div>
                    <div className=''>{fieldType}</div>
                </button>
            ))}
        </div>
    );
}

export default AddFieldPopup;

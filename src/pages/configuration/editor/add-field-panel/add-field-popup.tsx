import {icons} from 'assets';
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
        <div className='px-1 w-60'>
            {fields.map((fieldType: types.FieldType) => (
                <div
                    key={fieldType}
                    className={
                        'flex flex-row items-start justify-start ' +
                        'my-1 text-lg leading-10 font-weight-600 rounded ' +
                        'opacity-70 hover:opacity-100 cursor-pointer ' +
                        styleUtils.color.fieldTypeToClasses(fieldType)
                    }
                    onClick={() => props.insertField(fieldType)}
                >
                    <div className='w-10 h-10 p-2 ml-1 opacity-70'>
                        {icons.widgets}
                    </div>
                    <div className=''>{fieldType}</div>
                </div>
            ))}
        </div>
    );
}

export default AddFieldPopup;

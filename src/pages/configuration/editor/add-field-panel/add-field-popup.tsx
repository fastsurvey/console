import {icons} from 'assets';
import React from 'react';
import {colors} from 'utilities';
import {configTypes} from 'utilities';

interface Props {}
function AddFieldPopup(props: Props) {
    const fields: configTypes.FieldType[] = [
        'Email',
        'Option',
        'Radio',
        'Selection',
        'Text',
    ];
    return (
        <div
            className={
                'absolute z-50 top-0 mt-0 group-hover:mt-2 left-1/2 w-40 px-1 rounded shadow-md transform -translate-x-1/2 transition-size duration-200 bg-white cursor-pointer'
            }
        >
            {fields.map((fieldType: configTypes.FieldType, i: number) => (
                <div
                    className={
                        'flex flex-row items-start justify-start ' +
                        'my-1 text-lg leading-10 font-weight-600 rounded ' +
                        colors.colorToClasses(
                            colors.fieldTypeToColor(fieldType),
                        )
                    }
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

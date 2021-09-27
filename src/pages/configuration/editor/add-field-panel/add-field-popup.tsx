import React, {useState, useEffect} from 'react';
import {reduxUtils, styleUtils} from '@utilities';
import {types} from '@types';
import {Button} from '@components';
import {connect} from 'react-redux';

const fields: types.FieldType[] = [
    'email',
    'option',
    'radio',
    'selection',
    'text',
];

interface Props {
    insertField(fieldType: types.FieldType): void;
    closeModal(): void;
    modal: types.ModalState;
}
function AddFieldPopup(props: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => setSelectedIndex(-1), [props.modal.open]);

    return (
        <div className='w-full pt-1 flex-col-center gap-y-1.5 '>
            <div className='w-full p-3 flex-row-center gap-x-4'>
                <div className='flex-col-center gap-y-1.5'>
                    {fields.map((fieldType: types.FieldType, i: number) => (
                        <button
                            key={fieldType}
                            className={
                                'w-full h-8 rounded outline-none px-6 ' +
                                'font-weight-600 text-base text-center ' +
                                'border border-dashed ' +
                                (selectedIndex === i
                                    ? styleUtils.color.fieldTypeToClasses(
                                          fieldType,
                                      ) + ' border-transparent '
                                    : 'bg-gray-100 border-gray-400 text-gray-500 ' +
                                      'focus:bg-gray-200 focus:border-gray-500 focus:text-gray-900 ')
                            }
                            onClick={() =>
                                setSelectedIndex(selectedIndex === i ? -1 : i)
                            }
                        >
                            {fieldType}
                        </button>
                    ))}
                </div>
                <div className='flex-grow'>helh</div>
            </div>

            <div className='w-full p-2 mx-4 border-t border-gray-300 rounded-b flex-row-right gap-x-2'>
                <Button
                    text='cancel'
                    variant='flat-light-blue'
                    onClick={props.closeModal}
                />
                <Button
                    text='add field'
                    variant='flat-light-blue'
                    disabled={selectedIndex === -1}
                    onClick={() => props.insertField(fields[selectedIndex])}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    modal: state.modalState,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFieldPopup);

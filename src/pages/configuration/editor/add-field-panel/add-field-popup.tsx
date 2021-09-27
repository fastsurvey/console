import React, {useState, useEffect} from 'react';
import {reduxUtils, styleUtils} from '@utilities';
import {types} from '@types';
import {Button} from '@components';
import {connect} from 'react-redux';
import emailImage from '@assets/images/field-examples/field-example-email.png';
import optionImage from '@assets/images/field-examples/field-example-option.png';
import radioImage from '@assets/images/field-examples/field-example-radio.png';
import selectionImage from '@assets/images/field-examples/field-example-selection.png';
import textImage from '@assets/images/field-examples/field-example-text.png';

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
            <div className='w-full p-3 flex-row-top gap-x-2'>
                <div className='flex-col-center gap-y-1.5'>
                    {fields.map((fieldType: types.FieldType, i: number) => (
                        <button
                            key={fieldType}
                            className={
                                'w-full rounded outline-none ' +
                                'h-10 md:h-8 px-2 md:px-6 ' +
                                'font-weight-600 text-base text-center ' +
                                'border border-dashed ' +
                                (selectedIndex === i
                                    ? styleUtils.color.fieldTypeToClasses(
                                          fieldType,
                                      ) + ' border-transparent '
                                    : 'bg-gray-100 border-gray-400 text-gray-500 ' +
                                      'focus:bg-gray-200 focus:border-gray-500 focus:text-gray-900 ' +
                                      'hover:bg-gray-200 hover:border-gray-500 hover:text-gray-900 ')
                            }
                            onClick={() =>
                                setSelectedIndex(selectedIndex === i ? -1 : i)
                            }
                        >
                            {fieldType}
                        </button>
                    ))}
                </div>
                <div className='relative flex-grow -mt-6 overflow-hidden h-100 md:h-80'>
                    <div
                        className={
                            'absolute top-0 left-0 z-50 w-full h-6 ' +
                            'bg-gradient-to-b from-white to-transparent'
                        }
                    />
                    <div
                        className={
                            'absolute bottom-0 left-0 z-50 w-full h-6 ' +
                            'bg-gradient-to-t from-white to-transparent'
                        }
                    />

                    <div
                        className={
                            'w-full h-full overflow-y-scroll ' +
                            'px-2 md:px-4 pt-6 pb-6 ' +
                            'text-justify text-sm text-gray-700 '
                        }
                    >
                        {selectedIndex === -1 && (
                            <p className='text-base text-gray-800 font-weight-500'>
                                <span className='text-lg'>👈</span> select a
                                field type
                            </p>
                        )}
                        {fields[selectedIndex] === 'email' && (
                            <>
                                <p className='mb-3'>
                                    An{' '}
                                    <strong className='text-gray-900'>
                                        email field
                                    </strong>{' '}
                                    requires the respondent to enter his email -
                                    obviously.
                                </p>
                                <img
                                    className='w-full mb-3'
                                    src={emailImage}
                                    alt='how an email field looks like'
                                />
                                <p className='mb-3'>
                                    Optional: You can use this email to{' '}
                                    <strong className='text-gray-900'>
                                        verify submissions
                                    </strong>{' '}
                                    - after submitting, the respondent will be
                                    sent a verification-link to that email
                                    address. Only verified emails will count
                                    towards the final result. But, unverified
                                    emails will also be included in the raw data
                                    download (with a column "verified =
                                    true/false").
                                </p>
                                <p className='mb-3'>
                                    Optional: You can specify a{' '}
                                    <strong className='text-gray-900'>
                                        format-regex
                                    </strong>{' '}
                                    - how should the email look like? For
                                    example: someone@yourcompany.com . You can
                                    use this to: Only allow certain people to
                                    submit something AND/OR make sure, every
                                    employee only has one vote. We will publish
                                    a guide on this soon.
                                </p>
                            </>
                        )}
                        {fields[selectedIndex] === 'option' && (
                            <>
                                <p className='mb-3'>
                                    An{' '}
                                    <strong className='text-gray-900'>
                                        option field
                                    </strong>{' '}
                                    is a single checkbox. Example: "I accept the
                                    terms and conditions". You can enable the
                                    setting{' '}
                                    <strong className='text-gray-900'>
                                        required
                                    </strong>{' '}
                                    to only allow submissions with a selected
                                    checkbox.
                                </p>
                                <img
                                    className='w-full mb-3'
                                    src={optionImage}
                                    alt='how an option field looks like'
                                />
                                <p className='mb-3'>
                                    If you leave the{' '}
                                    <strong className='text-gray-900'>
                                        description
                                    </strong>{' '}
                                    empty, the phrase "Yes" will be placed next
                                    to the checkbox.
                                </p>
                            </>
                        )}
                        {fields[selectedIndex] === 'radio' && (
                            <>
                                <p className='mb-3'>
                                    A{' '}
                                    <strong className='text-gray-900'>
                                        radio field
                                    </strong>{' '}
                                    is a single-choice question. The respondent
                                    has to select exactly one option.
                                </p>
                                <img
                                    className='w-full mb-3'
                                    src={radioImage}
                                    alt='how a radio field looks like'
                                />
                            </>
                        )}
                        {fields[selectedIndex] === 'selection' && (
                            <>
                                <p className='mb-3'>
                                    A{' '}
                                    <strong className='text-gray-900'>
                                        selection field
                                    </strong>{' '}
                                    is a multiple-choice question. You can
                                    define the{' '}
                                    <strong className='text-gray-900'>
                                        minimum
                                    </strong>{' '}
                                    and{' '}
                                    <strong className='text-gray-900'>
                                        maximum
                                    </strong>{' '}
                                    number of options, the respondent is allowed
                                    to select.
                                </p>
                                <img
                                    className='w-full mb-3'
                                    src={selectionImage}
                                    alt='how a selection field looks like'
                                />
                            </>
                        )}
                        {fields[selectedIndex] === 'text' && (
                            <>
                                <p className='mb-3'>
                                    A{' '}
                                    <strong className='text-gray-900'>
                                        text field
                                    </strong>{' '}
                                    gives the respondent a text area to answer
                                    your question. You can define the{' '}
                                    <strong className='text-gray-900'>
                                        minimum
                                    </strong>{' '}
                                    and{' '}
                                    <strong className='text-gray-900'>
                                        maximum
                                    </strong>{' '}
                                    number of characters, this answer is allowed
                                    to have.
                                </p>
                                <img
                                    className='w-full mb-3'
                                    src={textImage}
                                    alt='how a text field looks like'
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-full p-2 mx-4 border-t border-white rounded-b flex-row-right gap-x-2'>
                <Button
                    text='cancel'
                    variant='flat-light-blue'
                    onClick={props.closeModal}
                />
                <Button
                    text='add field'
                    variant='flat-light-blue'
                    disabled={selectedIndex === -1}
                    onClick={() => {
                        props.insertField(fields[selectedIndex]);
                        props.closeModal();
                    }}
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

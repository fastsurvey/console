import React from 'react';
import icons from 'assets/icons/icons';
import AddFieldButton from './add-field-button';
import AddFieldPopup from './add-field-popup';
import {types} from 'types';
import dispatchers from '../../../../utilities/redux-utils/dispatchers';
import {connect} from 'react-redux';

interface Props {
    insertField(fieldType: types.FieldType): void;
    pasteField(): void;
    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
}
function AddFieldPanel(props: Props) {
    function openAddFieldModal() {
        props.openModal(
            'Add a new field',
            <AddFieldPopup
                insertField={(fieldType: types.FieldType) => {
                    props.closeModal();
                    props.insertField(fieldType);
                }}
            />,
        );
    }

    return (
        <div
            className={
                'relative w-full group gap-x-4 ' +
                'h-10 my-1 ' +
                'transition-size duration-400 ' +
                'flex flex-row items-center justify-center '
            }
        >
            <AddFieldButton
                label='add field'
                icon={icons.widgetAdd}
                onClick={openAddFieldModal}
            />
            <AddFieldButton
                label='paste field'
                icon={icons.duplicate}
                onClick={props.pasteField}
                leftIcon
            />
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: dispatchers.openModal(dispatch),
    closeModal: dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFieldPanel);

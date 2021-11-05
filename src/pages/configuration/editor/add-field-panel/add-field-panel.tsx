import React from 'react';
import {connect} from 'react-redux';
import {icons} from '/src/assets';
import {types} from '/src/types';
import {reduxUtils} from '/src/utilities';
import AddFieldButton from './add-field-button';
import AddFieldPopup from './add-field-popup';

interface Props {
    insertField(fieldType: types.FieldType): void;
    pasteField(): void;
    openModal(title: string, children: React.ReactNode): void;
    disabled: boolean;
}
function AddFieldPanel(props: Props) {
    function openAddFieldModal() {
        props.openModal('Add a new field', <AddFieldPopup {...props} />);
    }

    return (
        <div
            className={
                'relative w-full group gap-x-4 ' +
                'h-10 my-1 no-selection ' +
                'transition-size duration-400 ' +
                'flex flex-row items-center justify-center '
            }
        >
            <AddFieldButton
                label='add field'
                icon={icons.widgetAdd}
                onClick={openAddFieldModal}
                disabled={props.disabled}
            />
            <AddFieldButton
                label='paste field'
                icon={icons.duplicate}
                onClick={props.pasteField}
                leftIcon
                disabled={props.disabled}
            />
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: reduxUtils.dispatchers.openModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFieldPanel);

import React, {useEffect} from 'react';
import {dispatchers, stateTypes} from 'utilities';
import {connect} from 'react-redux';

interface Props {
    modalState: stateTypes.ModalState;
    closeModal(): void;
}
function Modal(props: Props) {
    useEffect(() => {
        if (props.modalState.open) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100vw';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [props.modalState.open]);

    return (
        <div
            className={
                'fixed top-0 bottom-0 left-0 right-0 z-50 center-content ' +
                ' no-selection transition-opacity duration-300 ' +
                (props.modalState.open
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0')
            }
        >
            <div
                className='absolute top-0 left-0 z-0 w-full h-full bg-gray-800 opacity-70'
                onClick={props.closeModal}
            />
            <div className='z-10 flex flex-col items-center justify-center p-4 bg-white rounded shadow'>
                <div className='mb-2 text-xl font-weight-600'>
                    {props.modalState.title}
                </div>
                <div className='max-w-50%'>{props.modalState.children}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    modalState: state.modalState,
});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: dispatchers.openModal(dispatch),
    closeModal: dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);

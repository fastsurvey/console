import React, {useEffect} from 'react';
import {reduxUtils} from 'utilities';
import {connect} from 'react-redux';
import {types} from 'types';

interface Props {
    modalState: types.ModalState;
    closeModal(): void;
}
function Modal(props: Props) {
    useEffect(() => {
        if (props.modalState.open) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.width = '100vw';
            document.body.style.top = `-${scrollY}px`;
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
            <div className='z-10 flex flex-col items-center justify-center p-2 bg-white rounded shadow'>
                <div className='px-2 mt-1 mb-2 text-xl text-gray-800 font-weight-600'>
                    {props.modalState.title}
                </div>
                <div className='max-w-50%'>{props.modalState.children}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    modalState: state.modalState,
});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);

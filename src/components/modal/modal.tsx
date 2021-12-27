import React, {useEffect} from 'react';
import {helperUtils, reduxUtils} from '/src/utilities';
import {connect} from 'react-redux';
import {types} from '/src/types';

interface Props {
    modalState: types.ModalState;
    closeModal(): void;
}
function Modal(props: Props) {
    helperUtils.useEvent('keydown', keydown);
    function keydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && props.modalState.open) {
            props.closeModal();
        }
    }

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
                'fixed top-0 bottom-0 left-0 right-0 p-1 z-50 centering-row ' +
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
            <section
                className='z-10 flex-grow-0 w-full max-w-lg bg-white rounded shadow flex-col-center'
                data-cy='popup-panel'
            >
                <h2
                    className='p-2 mt-2 text-xl text-gray-800 font-weight-600'
                    data-cy='popup-heading'
                >
                    {props.modalState.title}
                </h2>
                {props.modalState.children}
            </section>
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

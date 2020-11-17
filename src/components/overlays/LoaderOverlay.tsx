import React from 'react';
import {connect} from 'react-redux';

import stateTypes from 'utilities/types/state-types';

import {LogoBanner} from 'components';

import 'styles/loader.scss';

interface LoaderOverlayProps {
    loggingIn: boolean;
}

function LoaderOverlay(props: LoaderOverlayProps) {
    return (
        <div
            id='LoaderOverlay'
            className={
                'fixed z-50 bg-white w-100vw h-100vh center-content ' +
                'transition-opacity duration-500 delay-0 ' +
                (props.loggingIn
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none')
            }
        >
            <LogoBanner slim />
            <div
                className={
                    'transition-opacity duration-100 delay-1000 ' +
                    (props.loggingIn ? 'opacity-100' : 'opacity-0')
                }
            >
                <div className='lds-spinner'>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    loggingIn: state.loggingIn,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(LoaderOverlay);

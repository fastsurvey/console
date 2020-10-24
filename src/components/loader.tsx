import React from 'react';
import '../styles/loader.scss';
import {ReduxState} from '../utilities/types';
import {connect} from 'react-redux';

interface LoaderProps {
    loggingIn: boolean;
}

function Loader(props: LoaderProps) {
    return (
        <div
            className={
                'fixed z-50 bg-white w-100vw h-100vh center-content ' +
                'transition-opacity duration-500 delay-700 ' +
                (props.loggingIn
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none')
            }
        >
            <div
                className={
                    'transition-opacity duration-0 delay-700 ' +
                    (props.loggingIn ? 'opacity-100' : 'opacity-0')
                }
            >
                <div className='lds-ripple'>
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    loggingIn: state.loggingIn,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Loader);

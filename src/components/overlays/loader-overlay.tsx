import React from 'react';
import {connect} from 'react-redux';
import {stateTypes} from 'utilities';
import {LogoBanner} from 'components';
import 'styles/loader.scss';

interface Props {
    loggingIn: boolean;
}
function LoaderOverlay(props: Props) {
    return (
        <div
            id='LoaderOverlay'
            className={
                'fixed z-50 bg-white w-100vw h-100vh center-content ' +
                'transition-opacity duration-500 delay-500 ' +
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
                    {[...Array(12).keys()].map(() => (
                        <div />
                    ))}
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

import React from 'react';
import {connect} from 'react-redux';
import {stateTypes} from 'utilities';
import {LogoBanner} from 'components';
import 'styles/loader.css';

interface Props {
    loggingIn: boolean;
}
function LoaderOverlay(props: Props) {
    return (
        <div
            id='LoaderOverlay'
            className={
                'fixed z-50 bg-white w-100vw h-100vh center-content ' +
                'transition-opacity duration-0 delay-0 ' +
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
                    {[...Array(12).keys()].map((n: number) => (
                        <div key={n} />
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

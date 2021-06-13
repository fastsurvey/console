import React from 'react';
import {connect} from 'react-redux';
import {types} from 'types';
import 'styles/loader.css';

interface Props {
    loggingIn: boolean;
}
function LoaderOverlay(props: Props) {
    return (
        <div
            id='LoaderOverlay'
            className={
                'fixed z-50 w-screen h-screen centering-row ' +
                'transition-opacity duration-0 delay-0 ' +
                (props.loggingIn
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none')
            }
        >
            <div
                className={
                    'transition-opacity duration-100 delay-1000 ' +
                    (props.loggingIn ? 'opacity-100' : 'opacity-0')
                }
            >
                <div className='transform scale-[40%] lds-spinner'>
                    {[...Array(12).keys()].map((n: number) => (
                        <div key={n} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    loggingIn: state.loggingIn,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(LoaderOverlay);

import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Account, ReduxState} from '../utilities/types';
import {logOutAction} from '../utilities/reduxActions';
import assert from 'assert';

interface VerifyWallComponentProps {
    account: undefined | Account;
    logOut(): void;
}

function VerifyWallComponent(props: VerifyWallComponentProps) {
    const email = props.account?.email;
    assert(email !== undefined);

    return (
        <div className='w-25vw'>
            <h3 className='mb-4 text-center no-selection'>
                Verify your email first!
            </h3>
            <p className='mb-4 text-center'>
                Please verify your email address by clicking the link in the
                email we've just sent to:
            </p>
            <p className='text-center font-weight-600'>{email}</p>
            <div
                className={
                    'w-full text-center pt-4 text-gray-500 font-weight-500 no-selection'
                }
            >
                <Link to='/register'>
                    Wrong email address? Just register again.
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: () => dispatch(logOutAction()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VerifyWallComponent);

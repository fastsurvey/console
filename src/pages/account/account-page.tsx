import React from 'react';
import {connect} from 'react-redux';
import {types} from '@types';

function AccountPage(props: {
    account: types.Account;
    accessToken: types.AccessToken;
}) {
    return (
        <div
            className={
                'py-32 min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-4xl centering-col'>Account Page</div>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

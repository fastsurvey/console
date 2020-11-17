import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';

import {stateTypes, dispatcher} from 'utilities';

import NavbarButton from './NavbarButton';
import NavbarLogo from './NavbarLogo';

import {icons} from 'assets';

interface NavbarContentProps {
    logOut(): void;
    closeModal(): void;
    configIsDiffering: boolean;
    openMessage(message: stateTypes.Message): void;
}
function NavbarContent(props: NavbarContentProps) {
    let location = useLocation();
    let history = useHistory();

    function openLink(target: string) {
        props.closeModal();

        if (
            location.pathname.startsWith('/configuration') &&
            props.configIsDiffering
        ) {
            props.openMessage({
                text: 'Please save or undo your changes first!',
                type: 'warning',
            });
        } else {
            history.push(target);
        }
    }

    // TODO: Show popup before logout

    return (
        <React.Fragment>
            <NavbarLogo />
            <NavbarButton
                onClick={() => openLink('/configurations')}
                text='Configs'
                icon={icons.vote}
                active={location.pathname.startsWith('/configuration')}
            />
            <NavbarButton
                onClick={() => openLink('/results')}
                text='Results'
                icon={icons.charts}
                active={location.pathname === '/results'}
            />
            <NavbarButton
                onClick={() => openLink('/account')}
                text='Account'
                icon={icons.account}
                active={location.pathname === '/account'}
            />

            <div className={'self-stretch flex-grow'} />

            <div onClick={props.logOut}>
                <NavbarButton text='Logout' icon={icons.logout} />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatcher.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavbarContent);

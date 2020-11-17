import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import NavbarButton from './NavbarButton';
import NavbarLogo from './NavbarLogo';
import {ICONS} from '../../../assets/icons/icons';
import stateTypes from '../../../utilities/types/stateTypes';
import dispatcher from '../../../utilities/dispatcher';
import {connect} from 'react-redux';

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
                icon={ICONS.vote}
                active={location.pathname.startsWith('/configuration')}
            />
            <NavbarButton
                onClick={() => openLink('/results')}
                text='Results'
                icon={ICONS.charts}
                active={location.pathname === '/results'}
            />
            <NavbarButton
                onClick={() => openLink('/account')}
                text='Account'
                icon={ICONS.account}
                active={location.pathname === '/account'}
            />

            <div className={'self-stretch flex-grow'} />

            <div onClick={props.logOut}>
                <NavbarButton text='Logout' icon={ICONS.logout} />
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

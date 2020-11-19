import React from 'react';
import {icons} from 'assets';
import VisualButton from './visual-navbar-button';
import VisualLogo from './visual-navbar-logo';

interface Props {
    logOut(): void;
    openLink(to: string): void;
    location: any;
}
function NavbarContent(props: Props) {
    return (
        <React.Fragment>
            <VisualLogo />
            <VisualButton
                onClick={() => props.openLink('/configurations')}
                text='Configs'
                icon={icons.vote}
                active={props.location.pathname.startsWith('/configuration')}
            />
            <VisualButton
                onClick={() => props.openLink('/results')}
                text='Results'
                icon={icons.charts}
                active={props.location.pathname === '/results'}
            />
            <VisualButton
                onClick={() => props.openLink('/account')}
                text='Account'
                icon={icons.account}
                active={props.location.pathname === '/account'}
            />

            <div className={'self-stretch flex-grow'} />

            <div onClick={props.logOut}>
                <VisualButton text='Logout' icon={icons.logout} />
            </div>
        </React.Fragment>
    );
}
export default NavbarContent;

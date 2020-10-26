import React from 'react';
import {useLocation} from 'react-router-dom';
import NavbarButton from './NavbarButton';
import NavbarLogo from './NavbarLogo';
import {Link} from 'react-router-dom';
import {ICONS} from '../../../assets/icons/icons';

interface NavbarContentProps {
    logOut(): void;
    closeModal(): void;
}
function NavbarContent(props: NavbarContentProps) {
    const location = useLocation();
    return (
        <React.Fragment>
            <NavbarLogo />

            <Link to='/configurations' onClick={props.closeModal}>
                <NavbarButton
                    text='Configs'
                    icon={ICONS.vote}
                    active={location.pathname === '/configurations'}
                />
            </Link>
            <Link to='/results' onClick={props.closeModal}>
                <NavbarButton
                    text='Results'
                    icon={ICONS.charts}
                    active={location.pathname === '/results'}
                />
            </Link>
            <Link to='/account' onClick={props.closeModal}>
                <NavbarButton
                    text='Account'
                    icon={ICONS.account}
                    active={location.pathname === '/account'}
                />
            </Link>

            <div className={'self-stretch flex-grow'} />

            <div onClick={props.logOut}>
                <NavbarButton text='Logout' icon={ICONS.logout} />
            </div>
        </React.Fragment>
    );
}

export default NavbarContent;

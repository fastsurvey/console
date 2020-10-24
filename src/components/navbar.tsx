import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ICONS} from '../assets/icons/icons';
import FastSurveyIcon from '../assets/branding/rocket-light.svg';
import {logOutAction} from '../utilities/reduxActions';
import {connect} from 'react-redux';
import {ReduxState} from '../utilities/types';

function LogoComponent() {
    return (
        <div
            className={
                'w-58 mx-3 flex flex-row items-center justify-start mb-4 font-weight-600 p-2'
            }
        >
            <div className={'h-12 w-12 mr-3'}>
                <img src={FastSurveyIcon} alt='FastSurvey' />
            </div>
            <div className={'text-white text-2xl'}>FastSurvey</div>
        </div>
    );
}

interface NavbarLinkComponentProps {
    text: string;
    to: string;
    icon: React.ReactChild;
}
function NavbarLinkComponent(props: NavbarLinkComponentProps) {
    const active = useLocation().pathname === props.to;

    return (
        <Link to={props.to}>
            <div
                className={
                    'relative w-58 h-14 mx-3 my-1 p-2 text-lg font-weight-600 flex flex-row items-center justify-start rounded ' +
                    (active
                        ? 'text-white bg-gray-800'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800')
                }
            >
                <div className={'h-8 w-8'}>{props.icon}</div>
                <div className={'ml-2'}>{props.text}</div>
            </div>
        </Link>
    );
}

interface LogoutButtonProps {
    logOut(): void;
}
function LogoutButtonComponent(props: LogoutButtonProps) {
    return (
        <div
            onClick={props.logOut}
            className={
                'relative w-58 h-14 mx-3 my-1 p-2 text-lg font-weight-600 flex flex-row items-center justify-start rounded cursor-pointer ' +
                'text-gray-400 hover:text-white hover:bg-gray-800'
            }
        >
            <div className={'h-8 w-8'}>{ICONS.logout}</div>
            <div className={'ml-2'}>Logout</div>
        </div>
    );
}
const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: () => dispatch(logOutAction()),
});
const LogoutButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogoutButtonComponent);

interface NavbarComponentProps {
    children: React.ReactChild;
}
function NavbarComponent(props: NavbarComponentProps) {
    return (
        <React.Fragment>
            <div
                className={
                    'fixed left top w-64 pt-4 pb-1 h-100vh bg-gray-900 flex flex-col'
                }
            >
                <LogoComponent />
                <NavbarLinkComponent
                    text='Configs'
                    to='/configurations'
                    icon={ICONS.vote}
                />
                <NavbarLinkComponent
                    text='Results'
                    to='/results'
                    icon={ICONS.charts}
                />
                <NavbarLinkComponent
                    text='Account'
                    to='/account'
                    icon={ICONS.account}
                />
                <div className={'self-stretch flex-grow'} />
                <LogoutButton />
            </div>
            <div className={'relative ml-64'}>{props.children}</div>
        </React.Fragment>
    );
}

export default NavbarComponent;

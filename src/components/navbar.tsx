import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {isAssertionExpression} from 'typescript';
import {ICONS} from '../assets/icons/icons';

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
                <NavbarLinkComponent
                    text='Configs'
                    to='/configs'
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
                <NavbarLinkComponent
                    text='Logout'
                    to='/logout'
                    icon={ICONS.logout}
                />
            </div>
            <div className={'relative ml-64'}>{props.children}</div>
        </React.Fragment>
    );
}

export default NavbarComponent;

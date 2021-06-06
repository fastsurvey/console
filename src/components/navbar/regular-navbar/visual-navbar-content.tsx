import React from 'react';
import {icons, RocketLogoLight} from 'assets';

function NavbarLogo() {
    return (
        <div className='mb-4 overflow-hidden centering-row'>
            <div className='w-10 h-10 p-0.5'>
                <img src={RocketLogoLight} alt='FastSurvey' />
            </div>
            <div
                className={
                    'text-xl tracking-wide ' +
                    'text-blue-100 font-weight-700 ' +
                    'w-0 group-hover:w-36 transform translate-x-2 ' +
                    'transition-width duration-150'
                }
            >
                FastSurvey
            </div>
        </div>
    );
}

function NavbarButton(props: {
    text: string;
    active?: boolean;
    icon: React.ReactNode;
    onClick?(): void;
}) {
    return (
        <div
            onClick={props.onClick ? props.onClick : () => {}}
            className={
                'relative h-10 py-0 centering-row ' +
                'font-weight-400 text-base rounded cursor-pointer ' +
                (props.active ? 'text-white' : 'text-gray-400')
            }
        >
            <div className={'h-10 w-10 p-2 '}>{props.icon}</div>
            <div
                className={
                    'w-0 group-hover:w-36 transform translate-x-2 ' +
                    'transition-width duration-150 overflow-hidden'
                }
            >
                {props.text}
            </div>
        </div>
    );
}

function NavbarContent(props: {
    logOut(): void;
    openLink(to: string): void;
    location: any;
}) {
    return (
        <React.Fragment>
            <NavbarLogo />
            <NavbarButton
                onClick={() => props.openLink('/configurations')}
                text='Surveys'
                icon={icons.vote}
                active={props.location.pathname.startsWith('/configuration')}
            />
            <NavbarButton
                onClick={() => props.openLink('/results')}
                text='Results'
                icon={icons.charts}
                active={props.location.pathname === '/results'}
            />
            <NavbarButton
                onClick={() => props.openLink('/account')}
                text='Account'
                icon={icons.account}
                active={props.location.pathname === '/account'}
            />

            <div className={'self-stretch flex-grow'} />

            <NavbarButton
                onClick={props.logOut}
                text='Logout'
                icon={icons.logout}
            />
        </React.Fragment>
    );
}
export default NavbarContent;

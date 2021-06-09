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
                'relative h-10 py-0 centering-row my-0.5 ' +
                'font-weight-600 text-base rounded cursor-pointer ' +
                (props.active ? 'text-white bg-gray-700' : 'text-gray-200')
            }
        >
            <div className={'h-10 w-10 p-2 icon-light-blue'}>{props.icon}</div>
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
                icon={icons.survey}
                active={props.location.pathname.startsWith('/configuration')}
            />
            <NavbarButton
                onClick={() => props.openLink('/results')}
                text='Results'
                icon={icons.collection}
                active={props.location.pathname === '/results'}
            />
            <NavbarButton
                onClick={() => props.openLink('/account')}
                text='Account'
                icon={icons.user}
                active={props.location.pathname === '/account'}
            />

            <div className={'flex-max'} />

            <NavbarButton
                onClick={props.logOut}
                text='Logout'
                icon={icons.exit}
            />
        </React.Fragment>
    );
}
export default NavbarContent;

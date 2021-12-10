import React, {useRef} from 'react';
import {icons, RocketLogoLight} from '/src/assets';

function NavbarLogo(props: {mouseOver?: boolean}) {
    return (
        <div className='mb-4 overflow-hidden flex-row-left'>
            <div className='w-12 md:w-10 h-12 md:h-10 p-0.5 flex-shrink-0'>
                <img src={RocketLogoLight} alt='FastSurvey' />
            </div>
            <div
                className={
                    'text-2xl md:text-xl font-weight-600 md:font-weight-700 ' +
                    'text-blue-100 tracking-wide w-full ' +
                    'lg:group-focus-within:w-36 ' +
                    (props.mouseOver ? 'lg:w-36 ' : 'lg:w-0 ') +
                    'transform translate-x-2 ' +
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
    onClick(): void;
    mouseOver?: boolean;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const handleMouseLeave = () => ref.current?.blur();

    return (
        <button
            ref={ref}
            onClick={(e) => {
                props.onClick();
            }}
            onMouseLeave={handleMouseLeave}
            className={
                'relative h-10 py-0 centering-row my-1 ringable ' +
                'font-weight-700 md:font-weight-600 text-base rounded cursor-pointer ' +
                (props.active ? 'text-white bg-gray-700' : 'text-gray-200')
            }
            data-cy={`button-${props.text.toLowerCase()}`}
        >
            <div
                className={
                    'h-10 w-10 p-2 flex-shrink-0 ' +
                    (props.active ? 'svg-navbar-active' : 'svg-navbar-passive')
                }
            >
                {props.icon}
            </div>
            <div
                className={
                    'w-full lg:group-focus-within:w-36 ' +
                    (props.mouseOver ? 'lg:w-36 ' : 'lg:w-0 ') +
                    'transform translate-x-2 text-left ' +
                    'transition-width duration-150 overflow-hidden'
                }
            >
                {props.text}
            </div>
        </button>
    );
}

function VisualNavbarContent(props: {
    logOut(): void;
    openLink(to: string): void;
    location: any;
    mouseOver?: boolean;
}) {
    return (
        <React.Fragment>
            <NavbarLogo mouseOver={props.mouseOver} />
            <NavbarButton
                onClick={() => props.openLink('/surveys')}
                text='Surveys'
                icon={icons.collection}
                active={!props.location.pathname.startsWith('/account')}
                mouseOver={props.mouseOver}
            />
            <NavbarButton
                onClick={() => props.openLink('/account')}
                text='Account'
                icon={icons.gear}
                active={props.location.pathname.startsWith('/account')}
                mouseOver={props.mouseOver}
            />

            <div className={'flex-max'} />

            <NavbarButton
                onClick={props.logOut}
                text='Logout'
                icon={icons.exit}
                mouseOver={props.mouseOver}
            />
        </React.Fragment>
    );
}
export default VisualNavbarContent;

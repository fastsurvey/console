import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ICONS} from '../../assets/icons/icons';
import FastSurveyIcon from '../../assets/branding/rocket-light.svg';
import {logOutAction} from '../../utilities/reduxActions';
import {connect} from 'react-redux';
import {ReduxState} from '../../utilities/types';
import NavbarButton from './NavbarButton';

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

interface MobileNavbarProps {
    logOut(): void;
}
function MobileNavbar(props: MobileNavbarProps) {
    const location = useLocation();

    const [visible, setVisible] = useState(false);

    return (
        <React.Fragment>
            <div
                onClick={() => setVisible(false)}
                className={
                    'fixed z-40 w-full h-full ' +
                    'bg-gray-900 transition-opacity duration-300 ' +
                    (visible ? 'opacity-50' : 'opacity-0')
                }
            ></div>
            <div
                className={
                    'fixed shadow z-50 left-0 top-0 pt-4 pb-1 h-full ' +
                    'bg-gray-900 flex flex-col transition-width ' +
                    'duration-300 overflow-hidden ' +
                    (visible ? 'w-64' : 'w-0')
                }
            >
                <LogoComponent />

                <Link to='/configurations'>
                    <NavbarButton
                        text='Configs'
                        icon={ICONS.vote}
                        active={location.pathname === '/configurations'}
                    />
                </Link>
                <Link to='/results'>
                    <NavbarButton
                        text='Results'
                        icon={ICONS.charts}
                        active={location.pathname === '/results'}
                    />
                </Link>
                <Link to='/account'>
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
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: () => dispatch(logOutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MobileNavbar);

import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {stateTypes, dispatchers} from 'utilities';
import VisualNavbarContent from './visual-navbar-content';

interface Props {
    logOut(): void;
    closeNavbar(): void;
    configIsDiffering: boolean;
    openMessage(message: stateTypes.Message): void;
}
function NavbarContent(props: Props) {
    let location = useLocation();
    let history = useHistory();

    function openLink(target: string) {
        props.closeNavbar();

        if (props.configIsDiffering) {
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
        <VisualNavbarContent
            location={location}
            openLink={openLink}
            logOut={props.logOut}
        />
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavbarContent);

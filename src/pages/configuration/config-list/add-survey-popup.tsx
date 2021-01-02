import React from 'react';
import {configTypes, dispatchers, stateTypes} from 'utilities';
import {connect} from 'react-redux';

interface Props {
    configs: configTypes.SurveyConfig[] | undefined;
    closeModal(): void;
}
function AddSurveyPopup(props: Props) {
    if (props.configs) {
        return <div>Gokay</div>;
    } else {
        return <div />;
    }
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeModal: dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddSurveyPopup);

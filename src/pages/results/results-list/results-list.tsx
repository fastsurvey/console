import React from 'react';
import {connect} from 'react-redux';
import VisualResultsList from './visual-results-list';
import {types} from 'types';

function ResultsList(props: {
    configs: types.SurveyConfig[];
    account: types.Account;
    authToken: types.AuthToken;
}) {
    return (
        <VisualResultsList configs={props.configs} account={props.account} />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    configs: state.configs,
    account: state.account,
    authToken: state.authToken,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

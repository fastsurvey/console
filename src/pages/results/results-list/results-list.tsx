import React from 'react';
import {connect} from 'react-redux';
import VisualResultsList from './visual-results-list';
import {types} from '@types';
import {filter} from 'lodash';

function ResultsList(props: {
    configs: types.SurveyConfig[];
    account: types.Account;
    accessToken: types.AccessToken;
}) {
    const configsWithResults = filter(props.configs, (c) => !c.draft);
    return <VisualResultsList {...props} configs={configsWithResults} />;
}

const mapStateToProps = (state: types.ReduxState) => ({
    configs: state.configs,
    account: state.account,
    accessToken: state.accessToken,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

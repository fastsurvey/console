import React, {useState} from 'react';
import {connect} from 'react-redux';
import {types} from '@types';
import VisualSummaryHeader from './visual-summary-header';

function SummaryHeader(props: {
    account: types.Account;
    config: types.SurveyConfig;
    results: types.SurveyResults | undefined;
}) {
    return <VisualSummaryHeader {...props} refreshResults={() => {}} />;
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SummaryHeader);

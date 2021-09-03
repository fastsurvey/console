import React, {useState} from 'react';
import {connect} from 'react-redux';
import {types} from '@types';
import VisualSummaryHeader from './visual-summary-header';

function SummaryHeader(props: {
    account: types.Account;
    config: types.SurveyConfig;
}) {
    const [results, setResults] = useState<types.SurveyResults>({
        count: 0,
        aggregation: {},
    });

    return (
        <VisualSummaryHeader
            {...props}
            results={results}
            refreshResults={() => {}}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SummaryHeader);

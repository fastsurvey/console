import React, {useEffect, useState} from 'react';
import {types} from '@types';
import SummaryHeader from './summary-header/summary-header';
import {backend} from '@utilities';
import Field from './fields/field';

function Summary(props: {
    config: types.SurveyConfig;
    account: types.Account;
    accessToken: types.AccessToken;
}) {
    const [results, setResults] = useState<types.SurveyResults | undefined>(
        undefined,
    );
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        backend.fetchResults(
            props.account,
            props.accessToken,
            props.config.survey_name,
            (r) => {
                setResults(r);
                setFetching(false);
            },
            console.log,
        );
    }, []);

    return (
        <div className={'w-full py-16 min-h-screen bg-gray-100 flex-col-top'}>
            <div className={'w-full max-w-3xl '}>
                <SummaryHeader config={props.config} results={results} />
                {results !== undefined && (
                    <>
                        {props.config.fields.map((fieldConfig, index) => (
                            <Field
                                key={fieldConfig.local_id}
                                fieldConfig={fieldConfig}
                                fieldResults={results?.aggregation[index]}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Summary;

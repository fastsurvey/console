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
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        backend.fetchResults(
            props.account,
            props.accessToken,
            props.config.survey_name,
            (r) => {
                setResults(r);
                setIsFetching(false);
            },
            console.log,
        );
    }, []);

    function fetch() {
        setIsFetching(true);
        backend.fetchResults(
            props.account,
            props.accessToken,
            props.config.survey_name,
            (r) => {
                setResults(r);
                setIsFetching(false);
            },
            console.log,
        );
    }

    return (
        <div className={'w-full py-16 min-h-screen bg-gray-100 flex-col-top'}>
            <div className={'w-full max-w-3xl flex-col-center space-y-4'}>
                <SummaryHeader
                    config={props.config}
                    results={results}
                    isFetching={isFetching}
                    fetch={fetch}
                />
                {results !== undefined && (
                    <>
                        {props.config.fields.map((fieldConfig, index) => (
                            <Field
                                key={fieldConfig.local_id}
                                fieldIndex={index}
                                fieldConfig={fieldConfig}
                                results={results}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Summary;

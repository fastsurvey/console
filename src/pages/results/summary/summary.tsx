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
    const [isDownloading, setIsDownloading] = useState(false);

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

    function download() {
        function generateJSON(data: {[key: string]: any}[]) {
            const outputJSON = [];
            for (let i = 0; i < data.length; i++) {
                let outputSubmission: {
                    [key: string]: any;
                } = {};
                props.config.fields.forEach((f) => {
                    outputSubmission[f.title] = data[i][f.identifier];
                });
                outputJSON.push(outputSubmission);
            }

            var encodedUri = encodeURI(
                'data:text/json;charset=utf-8,' +
                    JSON.stringify(outputJSON, null, '\t'),
            );
            var link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute(
                'download',
                `${props.account.username}_${props.config.survey_name}_submissions.json`,
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsDownloading(false);
        }

        setIsDownloading(true);
        backend.fetchSubmissions(
            props.account,
            props.accessToken,
            props.config.survey_name,
            generateJSON,
            console.log,
        );
    }

    return (
        <div
            className={
                'px-4 w-full pb-16 pt-20 md:pt-16 min-h-screen bg-gray-100 flex-col-top'
            }
        >
            <div className={'w-full max-w-3xl flex-col-center space-y-4'}>
                <SummaryHeader
                    config={props.config}
                    isFetching={isFetching}
                    isDownloading={isDownloading}
                    fetch={fetch}
                    download={download}
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

import React, {useEffect, useState} from 'react';
import {types} from '/src/types';
import SummaryHeader from './components/results-header';
import {backend} from '/src/utilities';
import Field from './components/field';
import {reduce} from 'lodash';

function Results(props: {
    config: types.SurveyConfig;
    account: types.Account;
    accessToken: types.AccessToken;
    openMessage(id: types.MessageId): void;
}) {
    const [results, setResults] = useState<types.SurveyResults | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(fetch, []);

    function fetch() {
        function success(results: any) {
            setResults(results);
            setIsFetching(false);
        }
        function error(reason: 'authentication' | 'server') {
            setError(true);
            setIsFetching(false);
            switch (reason) {
                case 'authentication':
                    props.openMessage('error-access-token');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
        }

        setIsFetching(true);
        backend.fetchResults(
            props.account,
            props.accessToken,
            props.config.survey_name,
            success,
            error,
        );
    }

    function generateJSONuri(data: types.SurveySubmission[]) {
        const outputJSON = data.map((s, i) => ({
            submission_time: s.submission_time,
            submission: reduce(
                props.config.fields.filter(
                    (f) => f.type !== 'break' && f.type !== 'markdown',
                ),
                (a, f: any, i) => {
                    return {
                        ...a,
                        [`${i + 1} - ${f.description}`]: s.submission[f.identifier],
                    };
                },
                {},
            ),
        }));

        return encodeURI(
            'data:text/json;charset=utf-8,' + JSON.stringify(outputJSON, null, '\t'),
        );
    }

    function generateCSVuri(data: types.SurveySubmission[]) {
        let outputRows: string[][] = [];

        function escapeQuotes(text: string | number) {
            return '"' + `${text}`.replaceAll('"', '""') + '"';
        }

        let headerRow = ['"submission_time"'];
        props.config.fields.forEach((f) => {
            switch (f.type) {
                case 'email':
                    headerRow.push(escapeQuotes(f.description));
                    if (f.verify) {
                        headerRow.push(escapeQuotes(`${f.description} (verified)`));
                    }
                    break;
                case 'text':
                    headerRow.push(escapeQuotes(f.description));
                    break;
                case 'selection':
                    f.options.forEach((o) => {
                        headerRow.push(escapeQuotes(`${f.description} (${o.title})`));
                    });
                    break;
                case 'break':
                case 'markdown':
                    break;
                default:
                    throw `Invalid field config: ${f}`;
            }
        });

        outputRows.push(headerRow);

        for (let i = 0; i < data.length; i++) {
            let outputRow: string[] = [`${data[i].submission_time}`];
            props.config.fields.forEach((f) => {
                const fieldData: any = data[i].submission[f.identifier];
                switch (f.type) {
                    case 'email':
                        if (fieldData.email_address !== null) {
                            outputRow.push(escapeQuotes(fieldData.email_address));
                        } else {
                            outputRow.push('');
                        }
                        if (f.verify) {
                            if (fieldData.verified !== null) {
                                outputRow.push(`${fieldData.verified}`);
                            } else {
                                outputRow.push('');
                            }
                        }
                        break;
                    case 'text':
                        // TODO: solve #156
                        if (fieldData !== null) {
                            outputRow.push(escapeQuotes(fieldData));
                        } else {
                            outputRow.push('');
                        }
                        break;
                    case 'selection':
                        if (fieldData !== null) {
                            f.options.forEach((o) =>
                                outputRow.push(`${fieldData.includes(o.title)}`),
                            );
                        } else {
                            f.options.forEach(() => outputRow.push(''));
                        }
                        break;
                }
            });
            outputRows.push(outputRow);
        }

        return encodeURI(
            'data:text/json;charset=utf-8,' +
                outputRows.map((row) => row.join(',')).join('\n'),
        );
    }

    function download(format: types.DownloadFormat) {
        function success(data: types.SurveySubmission[]) {
            let encodedUri: string = '';
            switch (format) {
                case 'json':
                    encodedUri = generateJSONuri(data);
                    break;
                case 'csv':
                    encodedUri = generateCSVuri(data);
                    break;
                default:
                    throw 'Unknown format';
            }

            var link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute(
                'download',
                `${props.account.username}_${props.config.survey_name}_submissions.${format}`,
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsDownloading(false);
        }

        function error(reason: 'authentication' | 'server') {
            setError(true);
            setIsFetching(false);
            switch (reason) {
                case 'authentication':
                    props.openMessage('error-access-token');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
        }

        setIsDownloading(true);
        backend.fetchSubmissions(
            props.account,
            props.accessToken,
            props.config.survey_name,
            success,
            error,
        );
    }

    // TODO: Pretty empty state (no fields)

    const identifierToOrder = reduce(
        props.config.fields.filter((f) =>
            ['email', 'selection', 'text'].includes(f.type),
        ),
        (acc, f, i) => ({...acc, [f.identifier]: i + 1}),
        {},
    );

    return (
        <div
            className={
                'w-full px-2 pt-4 pb-20 md:py-16 min-h-screen bg-gray-150 flex-col-top'
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
                                identifierToOrder={identifierToOrder}
                                key={fieldConfig.local_id}
                                fieldIndex={index}
                                fieldConfig={fieldConfig}
                                results={results}
                            />
                        ))}
                    </>
                )}
                {error && (
                    <p className='w-full py-4 text-center text-gray-600 font-weight-500'>
                        Server response invalid, please try again later.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Results;

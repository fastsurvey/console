import React, {useEffect, useState} from 'react';
import {types} from '/src/types';
import SummaryHeader from './summary-header/summary-header';
import {backend} from '/src/utilities';
import Field from './fields/field';

function Summary(props: {
    config: types.SurveyConfig;
    account: types.Account;
    accessToken: types.AccessToken;
}) {
    const [results, setResults] = useState<types.SurveyResults | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(fetch, []);

    function fetch() {
        const successCallback = (r: any) => {
            setResults(r);
            setIsFetching(false);
        };
        const errorCallback = () => {
            setError(true);
            setIsFetching(false);
        };

        setIsFetching(true);
        backend.fetchResults(
            props.account,
            props.accessToken,
            props.config.survey_name,
            successCallback,
            errorCallback,
        );
    }

    function generateJSONuri(data: {[key: string]: any}[]) {
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

        return encodeURI(
            'data:text/json;charset=utf-8,' + JSON.stringify(outputJSON, null, '\t'),
        );
    }

    function generateCSVuri(data: {[key: string]: any}[]) {
        let outputRows: string[][] = [];

        function escapeQuotes(text: string | number) {
            return '"' + `${text}`.replaceAll('"', "'") + '"';
        }

        let headerRow: string[] = [];
        props.config.fields.forEach((f) => {
            switch (f.type) {
                case 'email':
                    headerRow.push(escapeQuotes(f.title));
                    if (f.verify) {
                        headerRow.push(escapeQuotes(`${f.title} (verified)`));
                    }
                    break;
                case 'text':
                    headerRow.push(escapeQuotes(f.title));
                    break;
                case 'selection':
                    f.options.forEach((o) => {
                        headerRow.push(escapeQuotes(`${f.title} (${o.title})`));
                    });
                    break;
            }
        });

        outputRows.push(headerRow);

        for (let i = 0; i < data.length; i++) {
            let outputRow: string[] = [];
            props.config.fields.forEach((f) => {
                const fieldData = data[i][f.identifier];
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
        function success(data: {[key: string]: any}[]) {
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

        setIsDownloading(true);
        backend.fetchSubmissions(
            props.account,
            props.accessToken,
            props.config.survey_name,
            success,
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
                {error && (
                    <p className='w-full py-4 text-center text-gray-600 font-weight-500'>
                        Server response invalid, please try again later.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Summary;

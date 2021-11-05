import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {types} from '/src/types';
import icons from '/src/assets/icons/icons';
import {Button, TimePill} from '/src/components';
import {connect} from 'react-redux';

const frontendUrl =
    import.meta.env.VITE_ENV === 'development'
        ? 'dev.fastsurvey.de'
        : 'fastsurvey.de';

function SummaryHeader(props: {
    account: types.Account;
    config: types.SurveyConfig;
    fetch(): void;
    download(format: types.DownloadFormat): void;
    isFetching: boolean;
    isDownloading: boolean;
}) {
    const {title, survey_name} = props.config;
    const {username} = props.account;

    const linkContent = (
        <div className='text-sm text-blue-700 underline md:truncate font-weight-600'>
            {frontendUrl}/{username}/{survey_name}
        </div>
    );

    const [showDownloadOptions, setShowDownloadOptions] = useState(false);

    return (
        <div className={'w-full flex-col-left mb-1 z-10'}>
            <div className='relative w-full flex-row-top '>
                <Link
                    to='/results'
                    className={
                        'w-10 h-10 m-1 p-2 ringable rounded icon-gray ' +
                        'absolute -left-14 top-50% transform -translate-y-50% '
                    }
                >
                    {icons.chevronLeftCircle}
                </Link>

                <div
                    className={
                        'pr-4 text-xl text-gray-800 font-weight-700 ' +
                        'md:truncate'
                    }
                >
                    {title}
                </div>
                <div className='flex-max' />
                <div className='relative'>
                    <Button
                        text={showDownloadOptions ? undefined : 'download'}
                        icon={showDownloadOptions ? icons.close : undefined}
                        loading={props.isDownloading}
                        onClick={() =>
                            setShowDownloadOptions(!showDownloadOptions)
                        }
                    />
                    {showDownloadOptions && (
                        <div
                            className={
                                'absolute right-0 -bottom-2 translate-y-full ' +
                                'rounded shadow flex-col-center overflow-hidden ' +
                                'bg-gray-900 text-gray-200 text-base '
                            }
                        >
                            {['json', 'csv'].map((format: any) => (
                                <button
                                    key={format}
                                    className={
                                        'w-full px-6 h-8 font-weight-600 ' +
                                        'hover:bg-gray-600 hover:text-white ' +
                                        'focus:bg-gray-600 focus:text-white focus:outline-none '
                                    }
                                    onClick={() => {
                                        props.download(format);
                                        setShowDownloadOptions(false);
                                    }}
                                >
                                    {format}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className='w-2' />
                <Button
                    text={'refresh'}
                    onClick={props.fetch}
                    loading={props.isFetching}
                />
            </div>
            <a
                href={`https://${frontendUrl}/${username}/${survey_name}`}
                className='px-1.5 py-0.5 transform -translate-x-1.5 rounded ringable'
                target='_blank'
                rel='noopener noreferrer'
            >
                {linkContent}
            </a>
            <div className='flex-shrink-0 mt-2 mb-2 md:mb-0'>
                <TimePill config={props.config} flat />
            </div>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SummaryHeader);

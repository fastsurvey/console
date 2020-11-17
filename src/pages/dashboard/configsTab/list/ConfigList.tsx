import React from 'react';
import {connect} from 'react-redux';

import configTypes from 'utilities/types/configTypes';
import stateTypes from 'utilities/types/stateTypes';

import {ButtonLink} from 'components';

import ConfigPreviewPanel from './ConfigPreviewPanel';

import icons from 'assets/icons/icons';

interface ConfigListProps {
    configs: undefined | configTypes.SurveyConfig[];
}
function ConfigList(props: ConfigListProps) {
    if (!props.configs) {
        return (
            <div
                className={
                    'flex flex-col items-center justify-center w-64 h-full'
                }
            >
                <p>Loading surveys</p>
            </div>
        );
    }

    return (
        <div
            className={
                'fixed flex flex-col w-80 p-2 h-screen bg-gray-300 ' +
                'border-r-4 border-gray-500 ' +
                'overflow-y-scroll overflow-x-hidden'
            }
        >
            {props.configs.length === 0 && (
                <p className='w-full text-center'>No surveys yet</p>
            )}
            {props.configs.map((config, index) => (
                <ConfigPreviewPanel
                    config={config}
                    index={index}
                    key={config.survey_name}
                />
            ))}
            <ButtonLink
                icon={icons.add}
                onClick={() => {}}
                className='w-full mt-1'
            >
                New survey
            </ButtonLink>
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);

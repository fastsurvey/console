import React from 'react';
import {connect} from 'react-redux';
import ButtonLink from '../../../components/links/ButtonLink';
import {ReduxState, SurveyConfig} from '../../../utilities/types';
import ConfigPreviewPanel from './ConfigPreviewPanel';

interface ConfigListProps {
    configs: undefined | SurveyConfig[];
}
function ConfigList(props: ConfigListProps) {
    if (!props.configs) {
        return (
            <React.Fragment>
                <h3>Configurations</h3>
                <p>Loading surveys ...</p>
            </React.Fragment>
        );
    }

    return (
        <div className='w-full center-content'>
            <div className='w-40vw'>
                <h3 className='text-center'>Configurations</h3>
                {props.configs.length === 0 && <p>No surveys yet</p>}
                {props.configs.map((config, index) => (
                    <ConfigPreviewPanel
                        config={config}
                        index={index}
                        key={config.survey_name}
                    />
                ))}
                <ButtonLink onClick={() => {}}>New survey</ButtonLink>
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);

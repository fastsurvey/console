import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ReduxState, SurveyConfig} from '../../../../utilities/types';
import EditorControlStrip from '../components/EditorControlStrip';
import GeneralConfig from '../components/GeneralConfig';

interface ConfigEditorProps {
    centralConfig: SurveyConfig;
}
function ConfigEditor(props: ConfigEditorProps) {
    const [localConfig, setLocalConfig] = useState(props.centralConfig);

    useEffect(() => {
        setLocalConfig({...props.centralConfig});

        // returned function will be called on component unmount
        return () => {
            console.log('UNMOUNTING');
        };
    }, [props.centralConfig]);

    return (
        <div
            id='ConfigEditor'
            className='flex flex-col items-center px-8 pt-4 pb-12'
        >
            <EditorControlStrip config={localConfig} />
            <GeneralConfig config={localConfig} />
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);

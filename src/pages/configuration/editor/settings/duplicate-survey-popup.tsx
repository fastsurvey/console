import React, {useState} from 'react';
import {reduxUtils, formUtils} from '@utilities';
import {connect} from 'react-redux';
import {Label, TextInput, Button} from '@components';
import {types} from '@types';

function DuplicateSurveyPopup(props: {
    configs: types.SurveyConfig[] | undefined;
    thisConfig: types.SurveyConfig;
    closeModal(): void;
    duplicateSurvey(surveyName: string): void;
}) {
    const [surveyName, setSurveyName] = useState(props.thisConfig.survey_name);

    const validationMessage = formUtils.validators.newSurveyName(
        props.configs,
        {
            ...props.thisConfig,
            survey_name: surveyName,
            local_id: -1,
        },
    );

    if (props.configs) {
        return (
            <div className='w-full p-3 pt-1 flex-col-center gap-y-2 '>
                <div className='w-full max-w-2xl centering-col gap-y-0.5'>
                    <Label text='New URL conform identifier' />
                    <TextInput value={surveyName} setValue={setSurveyName} />
                </div>
                {!validationMessage.valid && (
                    <div className='w-full px-3 mb-1 -mt-1 text-xs leading-tight text-red-500 font-weight-600'>
                        {validationMessage.message
                            .replace('URL conform identifier ', '')
                            .replace(' in URL conform identifier', '')}
                    </div>
                )}
                <div className='w-full flex-row-right gap-x-2'>
                    <Button
                        text='cancel'
                        variant='flat-light-blue'
                        onClick={() => {
                            props.closeModal();
                            setTimeout(() => setSurveyName(''), 500);
                        }}
                    />
                    <Button
                        text='duplicate survey'
                        variant='flat-light-blue'
                        disabled={!validationMessage.valid}
                        onClick={() => props.duplicateSurvey(surveyName)}
                    />
                </div>
            </div>
        );
    } else {
        return <div />;
    }
}

const mapStateToProps = (state: types.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DuplicateSurveyPopup);

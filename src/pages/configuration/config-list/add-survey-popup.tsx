import React, {useState} from 'react';
import {
    configTypes,
    dispatchers,
    hints,
    stateTypes,
    validators,
} from 'utilities';
import {connect} from 'react-redux';
import {TextInput, ModalButton} from 'components';

interface Props {
    configs: configTypes.SurveyConfig[] | undefined;
    closeModal(): void;
    addSurvey(surveyName: string): void;
}
function AddSurveyPopup(props: Props) {
    const [surveyName, setSurveyName] = useState('');

    const isValid = validators.newSurveyName(props.configs)(surveyName);

    if (props.configs) {
        return (
            <div className='flex flex-col items-start mt-2'>
                <div className='flex flex-row items-start'>
                    <div
                        className={
                            'h-12 mx-2 leading-12 text-lg ' +
                            'text-right font-weight-600 text-gray-800'
                        }
                    >
                        Identifier:
                    </div>
                    <div className='relative flex flex-row w-128'>
                        <TextInput
                            flat
                            placeholder='URL conform identifier'
                            value={surveyName}
                            onChange={setSurveyName}
                            onEnter={() => props.addSurvey(surveyName)}
                            hint={{
                                ...hints.newSurveyName(
                                    surveyName,
                                    validators.newSurveyName(props.configs),
                                ),
                                inlineHint: false,
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-center w-full mt-4 gap-x-2'>
                    <ModalButton
                        label='Cancel'
                        color='red-light'
                        onClick={() => {
                            props.closeModal();
                            setTimeout(() => setSurveyName(''), 500);
                        }}
                    />
                    <ModalButton
                        label='Add'
                        disabled={!isValid}
                        onClick={() => props.addSurvey(surveyName)}
                    />
                </div>
            </div>
        );
    } else {
        return <div />;
    }
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeModal: dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddSurveyPopup);

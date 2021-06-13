import React, {useState} from 'react';
import {reduxUtils, formUtils} from 'utilities';
import {connect} from 'react-redux';
import {Label, TextInput, Button} from 'components';
import {types} from 'types';

interface Props {
    configs: types.SurveyConfig[] | undefined;
    originalSurveyName: string;
    closeModal(): void;
    duplicateSurvey(surveyName: string): void;
}
function DuplicateSurveyPopup(props: Props) {
    const [surveyName, setSurveyName] = useState(props.originalSurveyName);

    const isValid = formUtils.validators.newSurveyName(props.configs)(
        surveyName,
    );

    if (props.configs) {
        return (
            <>
                <div className='w-full max-w-2xl centering-col gap-y-0.5'>
                    <Label text='New URL conform identifier' />
                    <TextInput value={surveyName} setValue={setSurveyName} />
                </div>
                <div className='w-full flex-row-right gap-x-2'>
                    <Button
                        text='Cancel'
                        variant='flat-light-blue'
                        onClick={() => {
                            props.closeModal();
                            setTimeout(() => setSurveyName(''), 500);
                        }}
                    />
                    <Button
                        text='Duplicate'
                        variant='flat-light-blue'
                        disabled={!isValid}
                        onClick={() => props.duplicateSurvey(surveyName)}
                    />
                </div>
            </>
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

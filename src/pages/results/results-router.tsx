import React from 'react';
import {connect} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import {types} from '/src/types';
import {Button} from '/src/components';
import Results from './results';

interface Props {
    account: types.Account;
    accessToken: types.AccessToken;
    configs: types.SurveyConfig[];
}
function ResultsRouter(props: Props) {
    let params: any = useParams();

    const filteredConfigs = props.configs.filter((config) => {
        return config.survey_name === params.survey_name;
    });

    if (filteredConfigs.length === 0) {
        return (
            <div className='box-border w-screen h-screen px-8 centering-col'>
                <div className='mb-2 text-lg text-gray-900 font-weight-600'>
                    404: Nothing here
                </div>

                <Link to='/configurations' className='rounded ringable'>
                    <Button text='Back to survey list' variant='flat-light-blue' />
                </Link>
            </div>
        );
    }

    return <Results config={filteredConfigs[0]} {...props} />;
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ResultsRouter);

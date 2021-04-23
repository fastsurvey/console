import {max} from 'lodash';
import {types} from 'types';

function newFieldId(config: types.SurveyConfig): number {
    const maxId = max(
        config.fields.map((field: types.SurveyField) => field.local_id),
    );
    if (maxId === undefined) {
        return config.local_id * 1000;
    }
    return maxId + 1;
}

export default newFieldId;

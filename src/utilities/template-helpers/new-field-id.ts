import {max} from 'lodash';
import {configTypes} from 'utilities';

function newFieldId(config: configTypes.SurveyConfig): number {
    const maxId = max(
        config.fields.map((field: configTypes.SurveyField) => field.local_id),
    );
    if (maxId === undefined) {
        return config.local_id * 1000;
    }
    return maxId + 1;
}

export default newFieldId;

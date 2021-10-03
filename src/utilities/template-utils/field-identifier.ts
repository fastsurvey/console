import {types} from '@types';
import {max} from 'lodash';

export const fieldIdentifier = (config: types.SurveyConfig): number => {
    const maxBackendId: number = config.max_identifier;
    const maxFieldId: any =
        config.fields.length > 0
            ? max(config.fields.map((f) => f.identifier))
            : -1;

    return max([maxBackendId, maxFieldId]) + 1;
};

import {types} from '/src/types';
import {max} from 'lodash';

export const fieldIdentifier = (config: types.SurveyConfig): number => {
    // this is necessary in case the user adds fields, removes some and
    // adds new ones again, all without saving the config

    const nextBackendId: number = config.next_identifier;
    const maxLocalId: any = max([...config.fields.map((f) => f.identifier), -1]);

    return max([nextBackendId, maxLocalId + 1]);
};

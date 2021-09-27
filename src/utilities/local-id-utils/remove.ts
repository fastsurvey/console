import {types} from '@types';
import {cloneDeep} from 'lodash';

/*
The only place where I need this functionality is when pushing
configs to the backend. Since the config specification does not
include local_id parameters, the backend validation would fail
without removing them first.

Since these local ids are initialized on page load and only
removed for the backend this type-violation here makes the
rest of the codebase way simpler.
*/

function survey(config: types.SurveyConfig) {
    const newConfig: any = cloneDeep(config);
    delete newConfig.local_id;
    delete newConfig.max_identifier;
    newConfig.fields = newConfig.fields.map(remove.field);
    return newConfig;
}

function field(fieldConfig: types.SurveyField) {
    // @ts-ignore
    delete fieldConfig.local_id;

    if (fieldConfig.type === 'radio' || fieldConfig.type === 'selection') {
        // @ts-ignore
        fieldConfig.options = fieldConfig.options.map((f) => f.title);
    }
    return fieldConfig;
}

export const remove = {
    survey,
    field,
};

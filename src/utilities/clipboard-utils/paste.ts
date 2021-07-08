import {types} from '@types';
import validateFormat from './validate-format';
export function paste(
    success: (fieldConfig: types.SurveyField) => void,
    error: () => void,
) {
    navigator.clipboard.readText().then((text: string) => {
        try {
            const newField = JSON.parse(text);

            if (!validateFormat.fieldConfig(newField)) {
                throw Error;
            }

            success(newField);
        } catch {
            error();
        }
    });
}

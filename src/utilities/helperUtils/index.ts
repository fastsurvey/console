import {concat} from 'lodash';

export function insertIntoArray<Type>(
    array: Type[],
    index: number,
    element: Type,
): Type[] {
    return concat(array.slice(0, index), element, array.slice(index, array.length));
}

export function removeFromArray<Type>(array: Type[], index: number): Type[] {
    return concat(array.slice(0, index), array.slice(index + 1, array.length));
}

export function formatAtoi(text: string) {
    return text.length > 0 ? parseInt(text) : 0;
}

export const helperUtils = {
    insertIntoArray,
    removeFromArray,
    formatAtoi,
};

export default helperUtils;

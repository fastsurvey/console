import {concat} from 'lodash';

function insert<Type>(array: Type[], index: number, element: Type): Type[] {
    return concat(array.slice(0, index), element, array.slice(index, array.length));
}

function remove<Type>(array: Type[], index: number): Type[] {
    return concat(array.slice(0, index), array.slice(index + 1, array.length));
}

export const array = {
    insert,
    remove,
};

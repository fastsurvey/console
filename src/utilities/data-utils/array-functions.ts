import {concat} from 'lodash';

function insert(array: any[], index: number, element: any) {
    return concat(
        array.slice(0, index),
        element,
        array.slice(index, array.length),
    );
}

function remove(array: any[], index: number) {
    return concat(array.slice(0, index), array.slice(index + 1, array.length));
}

export const array = {
    insert,
    remove,
};

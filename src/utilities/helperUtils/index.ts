import {concat} from 'lodash';
import {useEffect} from 'react';

function insertIntoArray<Type>(array: Type[], index: number, element: Type): Type[] {
    return concat(array.slice(0, index), element, array.slice(index, array.length));
}

function removeFromArray<Type>(array: Type[], index: number): Type[] {
    return concat(array.slice(0, index), array.slice(index + 1, array.length));
}

function formatAtoi(text: string) {
    return text.length > 0 ? parseInt(text) : 0;
}

function useEvent(event: any, handler: any) {
    // fires this event with every change of the handler
    useEffect(() => {
        window.addEventListener(event, handler);

        return function cleanup() {
            window.removeEventListener(event, handler);
        };
    });
}

export const helperUtils = {
    insertIntoArray,
    removeFromArray,
    formatAtoi,
    useEvent,
};

export default helperUtils;

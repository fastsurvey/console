import {concat, parseInt} from 'lodash';
import {useEffect} from 'react';

function insertIntoArray<Type>(array: Type[], index: number, element: Type): Type[] {
    return concat(array.slice(0, index), element, array.slice(index, array.length));
}

function removeFromArray<Type>(array: Type[], index: number): Type[] {
    return concat(array.slice(0, index), array.slice(index + 1, array.length));
}

function formatAtoi(text: string) {
    const parsed = parseInt(text);
    return parsed > 0 ? parsed : 0;
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

function pluralizeCountLabel(count: number, label: string) {
    return `${count} ${label}${count === 1 ? '' : 's'}`;
}

export const helperUtils = {
    insertIntoArray,
    removeFromArray,
    formatAtoi,
    useEvent,
    pluralizeCountLabel,
};

export default helperUtils;

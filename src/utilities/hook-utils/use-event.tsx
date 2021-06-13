import {useEffect} from 'react';

export default function useEvent(event: any, handler: any) {
    // fires this event with every change of the handler
    useEffect(() => {
        window.addEventListener(event, handler);

        return function cleanup() {
            window.removeEventListener(event, handler);
        };
    });
}

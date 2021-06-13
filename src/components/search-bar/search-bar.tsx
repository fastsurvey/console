import React, {useRef} from 'react';
import {icons} from 'assets';

function SearchBar(props: {value: string; setValue(v: string): void}) {
    const ref = useRef<HTMLInputElement>(null);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Escape') {
            props.setValue('');
            ref.current?.blur();
        }
    }
    return (
        <div className='relative flex-max '>
            <input
                ref={ref}
                className={
                    'relative p-1 bg-white text-gray-800 rounded shadow centering-row ' +
                    'cursor-pointer no-selection h-9 py-1 pl-10 pr-3 w-full ringable'
                }
                placeholder='search'
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div
                className={
                    'absolute top-0 left-0 w-10 h-10 p-2.5 opacity-70 icon-blue '
                }
            >
                {icons.search}
            </div>
        </div>
    );
}

//
export default SearchBar;

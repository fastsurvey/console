import React, {useRef} from 'react';
import {icons} from '/src/assets';

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
                    'relative h-9 w-full py-1 pl-10 pr-3 centering-row ' +
                    'bg-white text-gray-800 rounded shadow ' +
                    'cursor-pointer no-selection ringable ' +
                    'font-weight-500'
                }
                placeholder='search'
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div
                className={
                    'absolute top-0 left-0 w-9 h-9 p-2 opacity-70 svg-search-bar '
                }
            >
                {icons.search}
            </div>
        </div>
    );
}

//
export default SearchBar;

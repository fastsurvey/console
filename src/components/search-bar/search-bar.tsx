import React, {useState} from 'react';
import {icons} from 'assets';

function SearchBar(props: {value: string; setValue(v: string): void}) {
    const [focused, setFocused] = useState(false);
    return (
        <div className='relative flex-max '>
            <input
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={
                    'relative p-1 bg-white text-gray-800 rounded shadow centering-row ' +
                    'cursor-pointer no-selection h-10 py-1 pl-10 pr-3 w-full ' +
                    'outline-none focus:ring ring-blue-200 font-weight-500'
                }
                placeholder='search'
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

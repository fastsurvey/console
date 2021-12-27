import React, {useState} from 'react';

type Tab = 'plain text' | 'split view' | 'rendered';

function MarkdownFieldEditor(props: {
    value: string;
    setValue(v: string): void;
    disabled: boolean;
}) {
    const [tab, setTab] = useState<Tab>('split view');

    return (
        <div className='w-full space-y-4 flex-col-left'>
            <div className='space-x-2 flex-row-left'>
                {['plain text', 'split view', 'rendered'].map((t: any) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={
                            (t === tab
                                ? 'bg-blue-50 text-blue-800 '
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700 ') +
                            'py-1 px-3 font-weight-600 text-base rounded'
                        }
                        data-cy={`tab-${t.toLowerCase()}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className='w-full h-64 space-x-2 flex-row-left'>
                {tab !== 'rendered' && (
                    <div className='flex-grow text-center'>plain</div>
                )}
                {tab === 'split view' && (
                    <div className='w-0 h-full mx-2 border-r-2 border-gray-300 border-dashed' />
                )}
                {tab !== 'plain text' && (
                    <div className='flex-grow text-center'>render</div>
                )}
            </div>
        </div>
    );
}

export default MarkdownFieldEditor;

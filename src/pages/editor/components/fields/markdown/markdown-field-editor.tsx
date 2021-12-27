import React, {useState} from 'react';
import {TextArea} from '/src/components';

type Tab = 'plain text' | 'split view' | 'rendered';

function MarkdownFieldEditor(props: {
    value: string;
    setValue(v: string): void;
    disabled: boolean;
}) {
    const [tab, setTab] = useState<Tab>('split view');

    // TODO: Add help box to explain markdown syntax

    return (
        <div className='w-full -mt-1 space-y-3 flex-col-left'>
            <div className='space-x-2 flex-row-left'>
                {['plain text', 'split view', 'rendered'].map((t: any) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={
                            (t === tab
                                ? 'bg-blue-50 text-blue-800 '
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700 ') +
                            'py-1 px-3 font-weight-600 text-base rounded ringable'
                        }
                        data-cy={`tab-${t.toLowerCase()}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div
                className={
                    'w-full h-80 space-x-2 grid ' +
                    'divide-x divide-dashed divide-gray-300 ' +
                    (tab === 'split view'
                        ? 'grid-cols-1 md:grid-cols-2 '
                        : 'grid-cols-1 ')
                }
            >
                {tab !== 'rendered' && (
                    <div className='h-full text-center'>
                        <textarea
                            value={props.value}
                            onChange={(e) => props.setValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    // @ts-ignore
                                    e.target.blur();
                                }
                            }}
                            className={
                                'w-full px-3 py-1.5 rounded h-full ringable font-weight-500 z-0 ' +
                                'resize-none ' +
                                (props.disabled
                                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed '
                                    : 'bg-gray-100 text-gray-800 ')
                            }
                            disabled={props.disabled === true}
                            data-cy='input-description'
                        />
                    </div>
                )}
                {tab !== 'plain text' && (
                    <div className='h-full text-center'>render</div>
                )}
            </div>
        </div>
    );
}

export default MarkdownFieldEditor;

import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

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
                    'w-full h-96 space-x-2 grid ' +
                    'divide-x divide-dashed divide-gray-300 ' +
                    (tab === 'split view'
                        ? 'grid-cols-1 md:grid-cols-2 '
                        : 'grid-cols-1 ')
                }
            >
                {tab !== 'rendered' && (
                    <div className='relative h-full'>
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
                                'resize-none font-mono ' +
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
                    <div className='relative h-full overflow-hidden'>
                        <div
                            className={
                                'absolute w-full h-6 left-0 bottom-0 bg-gradient-to-b z-10 ' +
                                'from-[rgba(255,255,255,0%)] to-[rgba(255,255,255,100%)]'
                            }
                        />
                        <div
                            className={
                                'h-full overflow-y-scroll prose-sm prose-slate px-4 pt-2 pb-12 z-0 ' +
                                'prose-headings:font-weight-700 prose-headings:mb-2 prose-headings:mt-0 ' +
                                'prose-h1:text-2xl ' +
                                'prose-h2:text-xl ' +
                                'prose-h3:text-lg ' +
                                'prose-h4:text-base ' +
                                'prose-a:text-blue-800 prose-a:underline prose-a:font-weight-600 ' +
                                'prose-p:mb-4 prose-hr:mt-4 prose-hr:mb-6 ' +
                                'prose-p:text-base prose-p:font-weight-500 ' +
                                'prose-table:border-collapse ' +
                                'prose-th:border prose-th:border-gray-300 prose-th:mb-0 ' +
                                'prose-td:border prose-td:border-gray-300 ' +
                                'prose-th:bg-gray-200 prose-th:text-gray-900 ' +
                                'prose-td:font-weight-500 ' +
                                'even:prose-tr:bg-gray-100 odd:prose-tr:bg-white ' +
                                'even:prose-tr:text-gray-700 odd:prose-tr:text-gray-600 ' +
                                'hover:prose-tr:bg-blue-50  hover:prose-tr:text-blue-900 ' +
                                'prose-th:!px-2 prose-td:!px-2 prose-th:!py-1 prose-td:!py-1 ' +
                                'prose-ul:list-disc prose-ol:list-decimal prose-ol:list-inside prose-ul:list-inside ' +
                                'prose-ul:-mt-3 prose-ol:-mt-3 prose-li:-mt-1 ' +
                                'prose-ol:pl-1 prose-ul:pl-1 ' +
                                'marker:prose-ul:text-gray-800 marker:prose-ol:text-gray-800 marker:prose-ol:font-weight-700'
                            }
                        >
                            <ReactMarkdown
                                children={props.value.replace(
                                    /\\n\\n/g,
                                    '\n\n&nbsp;\n\n  ',
                                )}
                                remarkPlugins={[remarkGfm, remarkMath]}
                                components={{
                                    a: ({node, ...props}) => (
                                        <a
                                            {...props}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='inline text-left underline'
                                        >
                                            {props.children}
                                        </a>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MarkdownFieldEditor;

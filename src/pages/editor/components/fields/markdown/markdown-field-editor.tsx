import {join} from 'lodash';
import React, {useState} from 'react';
import {icons} from '/src/assets';
import {MarkdownContent} from '/src/components/layout/markdown-content';

type Tab = 'plain text' | 'split view' | 'rendered';

const MarkdownFieldEditor = React.forwardRef(
    (
        props: {
            value: string;
            setValue(v: string): void;
            disabled: boolean;
        },
        ref: any,
    ) => {
        const [tab, setTab] = useState<Tab>('plain text');
        const [detailIsOpen, setDetailIsOpen] = useState(false);
        const toggleDetail = () => {
            setDetailIsOpen(!detailIsOpen);
        };
        const [animateDemo, setAnimateDemo] = useState(false);

        function addDemoContent() {
            props.setValue(
                join(
                    [
                        '# Superbig Heading',
                        '## Big Heading',
                        '### Medium Heading',
                        '#### ...',
                        'You can also write plain text which will be displayed as regular paragraphs. This text can include **bold text**, *italicized text* or [links](https://www.example.com).',
                        '[links can be standalone as well](https://www.example.com)',
                        'You can use images from the internet:',
                        '![text describing the image, will be displayed if URL invali](https://images.unsplash.com/photo-1641511277205-ae6393618996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80)',
                        'Lists are fancy to (here is an ordered one):\n1. First item\n2. Second item\n3. Third item',
                        'Lists are fancy to (here is an unordered one):\n- First item\n- Second item\n- Third item',
                        '---',
                        'Separate your content with a horizontal line like this one 👆.',
                        'Or copy & paste emojis from [https://getemoji.com/](https://getemoji.com/)',
                        '| tables | are | nice | too |\n| :--- | :--- | :---: | ---: |\n| align stuff to the | left | center | right |\n| Lorem ipsum | dolor sit amet | consectetur | adipisicing |',
                    ],
                    '\n\n',
                ),
            );
            setAnimateDemo(true);
            setTab('split view');
        }

        return (
            <div className='w-full -mt-1 space-y-3 flex-col-left'>
                <div className='w-full space-x-2 flex-row-left'>
                    <button
                        className={
                            'w-9 h-7 px-2 py-1 md:w-6 md:h-6 md:p-1 ' +
                            'svg-label-info cursor-pointer ' +
                            'relative block ringable rounded z-50 ml-0.5'
                        }
                        onClick={toggleDetail}
                    >
                        {detailIsOpen ? icons.closeCircle : icons.information}
                    </button>
                    {['plain text', 'split view', 'rendered'].map((t: any) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={
                                (t === tab
                                    ? 'bg-blue-50 text-blue-800 '
                                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700 ') +
                                'py-1 px-3 font-weight-600 text-base rounded ringable ' +
                                (t === 'split view' ? 'hidden md:block ' : ' ') +
                                (t === 'split view' && animateDemo
                                    ? 'animate-pop '
                                    : ' ')
                            }
                            data-cy={`tab-${t.toLowerCase()}`}
                            disabled={props.disabled}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                {detailIsOpen && (
                    <div
                        className={
                            ' p-3 w-full mb-1 rounded ' +
                            'bg-gray-800 text-gray-100 ' +
                            'text-sm font-weight-500 text-justify'
                        }
                    >
                        <p className='mb-2'>
                            Markdown is a formatting language that can be used to
                            structure blocks of text. We currently support: headings,
                            bold/italic text, links, lists, tables and images from the
                            internet.
                        </p>
                        <p className='mb-2'>
                            You can find a documentation on markdown syntax here:{' '}
                            <a
                                className='text-blue-100 underline break-all'
                                href='https://www.markdownguide.org/cheat-sheet/'
                                target='_blank'
                            >
                                https://www.markdownguide.org/cheat-sheet/
                            </a>
                        </p>
                        <p>
                            You can also fill this field with some demo content:{' '}
                            <button
                                className='text-blue-100 underline break-all'
                                onClick={addDemoContent}
                            >
                                click here
                            </button>
                        </p>
                    </div>
                )}
                <div
                    className={'h-px bg-gray-300'}
                    style={{width: 'calc(100% + 1.5rem)'}}
                />
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
                                ref={ref}
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
                                disabled={props.disabled}
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
                            <MarkdownContent content={props.value} className='pb-12' />
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

export default MarkdownFieldEditor;

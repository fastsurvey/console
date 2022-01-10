import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const MarkdownContent = (props: {content: string; className?: string}) => (
    <div
        data-cy='markdown-content'
        className={
            'h-full w-full overflow-y-scroll prose-sm prose-slate px-4 py-4 z-0 ' +
            'prose-headings:font-weight-700 prose-headings:mb-2 prose-headings:mt-0 ' +
            'prose-h1:text-2xl ' +
            'prose-h2:text-xl ' +
            'prose-h3:text-lg ' +
            'prose-h4:text-base ' +
            'prose-a:text-blue-800 prose-a:underline prose-a:font-weight-600 ' +
            'prose-p:mb-4 prose-hr:mt-4 prose-hr:mb-6 prose-hr:border-gray-300 ' +
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
            'marker:prose-ul:text-gray-800 marker:prose-ol:text-gray-800 marker:prose-ol:font-weight-700 ' +
            (props.className || '')
        }
    >
        <ReactMarkdown
            children={props.content}
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
);

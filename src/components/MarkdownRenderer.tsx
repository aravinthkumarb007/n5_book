'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content text-xs sm:text-sm leading-relaxed space-y-2.5 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Level 1 Heading
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-black text-stone-900 dark:text-white mt-4 mb-2 pb-1 border-b border-stone-200 dark:border-stone-700 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-red-600 inline-block" />
              <span>{children}</span>
            </h1>
          ),
          // Level 2 Heading
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white mt-3.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-4 rounded-full bg-red-600 inline-block" />
              <span>{children}</span>
            </h2>
          ),
          // Level 3 Heading (Session Title, etc.)
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-red-700 dark:text-red-400 mt-3 mb-1.5 flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-xl border border-red-200 dark:border-red-900/60 w-fit">
              <span>{children}</span>
            </h3>
          ),
          // Level 4 Heading (Mnemonic, Tips)
          h4: ({ children }) => (
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mt-2.5 mb-1">
              {children}
            </h4>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-stone-700 dark:text-stone-200 leading-relaxed mb-2 last:mb-0">
              {children}
            </p>
          ),
          // Bold text
          strong: ({ children }) => (
            <strong className="font-bold text-stone-900 dark:text-white">
              {children}
            </strong>
          ),
          // Italic / Romaji
          em: ({ children }) => (
            <em className="italic text-stone-600 dark:text-stone-300 font-mono text-[11px] sm:text-xs">
              {children}
            </em>
          ),
          // Unordered Lists
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-4 list-disc marker:text-red-600 text-stone-700 dark:text-stone-300">
              {children}
            </ul>
          ),
          // Ordered Lists
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2 pl-4 list-decimal marker:text-red-600 marker:font-bold text-stone-700 dark:text-stone-300">
              {children}
            </ol>
          ),
          // List Items
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">
              {children}
            </li>
          ),
          // Table Layout (GFM Tables)
          table: ({ children }) => (
            <div className="w-full my-3 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700 shadow-xs bg-white dark:bg-stone-850">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-bold border-b border-stone-200 dark:border-stone-700">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-red-50/40 dark:hover:bg-red-950/20 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 border-r last:border-r-0 border-stone-200 dark:border-stone-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="py-2 px-3 text-stone-800 dark:text-stone-200 border-r last:border-r-0 border-stone-100 dark:border-stone-800 font-japanese">
              {children}
            </td>
          ),
          // Inline Code & Backticks
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-red-600 dark:text-red-400 font-mono text-[11px] font-semibold">
              {children}
            </code>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-red-600 pl-3.5 py-1.5 my-2.5 bg-red-50/50 dark:bg-red-950/30 rounded-r-xl text-stone-700 dark:text-stone-300 italic text-xs">
              {children}
            </blockquote>
          ),
          // Horizontal Rule
          hr: () => (
            <hr className="my-3 border-t border-stone-200 dark:border-stone-700" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

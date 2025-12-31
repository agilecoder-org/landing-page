"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

interface RenderMarkdownProps {
    slug: string;
    category: string;
    className?: string;
}

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ slug, category, className }) => {
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(typeof window !== "undefined");
    }, []);

    useEffect(() => {
        const loadMarkdownFile = async () => {
            try {
                const response = await fetch(`/blogs/${category}-${slug}.md`);
                if (!response.ok) {
                    throw new Error("Failed to load markdown file");
                }
                const data = await response.text();
                setContent(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        if (slug && category && isClient) {
            loadMarkdownFile();
        }
    }, [slug, category, isClient]);

    if (!isClient) {
        return null;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={className}>
            {content ? (
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                        // className="markdown"
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={materialOceanic}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </article>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RenderMarkdown;

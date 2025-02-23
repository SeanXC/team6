import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

interface ExplanationTextProps {
    text: string;
}

interface CodeComponentProps extends ReactMarkdownProps {
  inline?: boolean;
  className?: string;
}

const MarkdownComponents = {
  // Headings
  h1: ({ node, children, ...props }: ReactMarkdownProps) => (
    <h1 className="text-3xl font-bold my-8" {...props}>
      {children}
    </h1>
  ),
  h2: ({ node, children, ...props }: ReactMarkdownProps) => (
    <h2 className="text-2xl font-semibold my-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }: ReactMarkdownProps) => (
    <h3 className="text-xl font-medium my-4" {...props}>
      {children}
    </h3>
  ),

  // Paragraph
  p: ({ node, children, ...props }: ReactMarkdownProps) => (
    <p className="text-base my-2" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ node, children, ...props }: ReactMarkdownProps) => (
    <ul className="list-disc list-inside my-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ node, children, ...props }: ReactMarkdownProps) => (
    <ol className="list-decimal list-inside my-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ node, children, ...props }: ReactMarkdownProps) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),

  // Links
  a: ({ node, children, ...props }: ReactMarkdownProps) => (
    <a className="text-blue-500 hover:underline" {...props}>
      {children}
    </a>
  ),

  // Blockquotes
  blockquote: ({ node, children, ...props }: ReactMarkdownProps) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props}>
      {children}
    </blockquote>
  ),

  // Code blocks and inline code
  code: ({ node, inline, className, children, ...props }: CodeComponentProps) => {
    return !inline ? (
      <pre className="bg-gray-800 text-white p-4 rounded my-2">
        <code {...props}>{children}</code>
      </pre>
    ) : (
      <code className="bg-gray-200 rounded px-1" {...props}>
        {children}
      </code>
    );
  },
};

function ExplanationText({text}: ExplanationTextProps) {
	const paragraphs = text.split('\n\n');

	const paragraphsRendered = paragraphs.map((paragraph) => {
		return <ReactMarkdown components={MarkdownComponents}>{paragraph}</ReactMarkdown>;
	});
    
	return paragraphsRendered;
}

export default ExplanationText;
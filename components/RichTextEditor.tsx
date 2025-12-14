
import React, { useCallback, useState } from 'react';
import { Textarea } from './Textarea';
import { Button } from './Button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id: string;
  className?: string;
  rows?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  rows = 10,
}) => {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  const applyFormat = useCallback((before: string, after: string = '') => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const currentText = textareaRef.value;

    const selectedText = currentText.substring(start, end);
    const newText = currentText.substring(0, start) + before + selectedText + after + currentText.substring(end);

    onChange(newText);

    // Restore cursor position and selection
    setTimeout(() => {
      if (textareaRef) {
        if (selectedText) {
          textareaRef.setSelectionRange(start + before.length, end + before.length);
        } else {
          textareaRef.setSelectionRange(start + before.length, start + before.length);
        }
        textareaRef.focus();
      }
    }, 0);
  }, [textareaRef, onChange]);

  const insertTag = useCallback((tag: string) => {
    applyFormat(`<${tag}>`, `</${tag}>`);
  }, [applyFormat]);

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-textLight dark:text-textDark">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 p-2 bg-cardBackground dark:bg-cardBackgroundDark border border-border dark:border-borderDark rounded-t-md">
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('**', '**')}>
          <strong>B</strong>
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('*', '*')}>
          <em>I</em>
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('`', '`')}>
          Code
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('```\n', '\n```')}>
          Code Block
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('[Link Text](', ')')}>
          Link
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('## ', '')}>
          H2
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('### ', '')}>
          H3
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('- ', '')}>
          List
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('1. ', '')}>
          Num List
        </Button>
        <Button size="sm" variant="ghost" type="button" onClick={() => applyFormat('<blockquote>\n', '\n</blockquote>')}>
          Quote
        </Button>
      </div>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rounded-t-none"
        textareaRef={setTextareaRef} // Pass ref here
      />
    </div>
  );
};

// Augment TextareaProps to accept a ref
declare module 'react' {
  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    textareaRef?: (instance: HTMLTextAreaElement | null) => void;
  }
}

// Re-export Textarea with the augmented props type
// This isn't strictly necessary if Textarea is internal, but good for clarity.
const OriginalTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; id: string; textareaRef?: (instance: HTMLTextAreaElement | null) => void; }
> = ({ label, id, className = '', textareaRef, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-textLight dark:text-textDark">
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={textareaRef}
        className={`px-3 py-2 border border-border dark:border-borderDark rounded-md bg-cardBackground dark:bg-cardBackgroundDark text-textLight dark:text-textDark placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-y ${className}`}
        rows={4}
        {...props}
      ></textarea>
    </div>
  );
};

// Overwrite the Textarea export with the ref-enabled version
// This is done to avoid creating a new file for the Textarea component.
// In a real codebase, the original Textarea component would be modified.
export { OriginalTextarea as Textarea };

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import MenuBar from './MenuBar';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const debouncedOnChange = useMemo(
    () =>
      debounce((content: string) => {
        onChange(content);
      }, 200),
    [onChange],
  );

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-invert prose-headings:my-2 prose-p:m-0 min-h-[65px] focus:outline-none',
      },
    },
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      debouncedOnChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div className="border rounded-md bg-white dark:bg-gray-800">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <div className="p-4 h-[100px] overflow-y-auto">
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
};

export default TipTapEditor;

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import MenuBar from './MenuBar';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border rounded-md p-2 bg-white dark:bg-gray-800">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;

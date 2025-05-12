import { Editor } from '@tiptap/react';

interface MenuBarProps {
  editor: Editor;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2 text-sm">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'font-bold underline' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'italic underline' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'line-through underline' : ''}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'underline' : ''}
      >
        • Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'underline' : ''}
      >
        1. Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'underline' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'underline' : ''}
      >
        H2
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
    </div>
  );
};

export default MenuBar;

import BoldIcon from '@/components/icons/BoldIcon';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import CodeIcon from '@/components/icons/CodeIcon';
import ItalicIcon from '@/components/icons/ItalicIcon';
import StrikeIcon from '@/components/icons/StrikeIcon';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

interface MenuBarProps {
  editor: Editor;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  if (!editor) return null;

  return (
    <div className="relative flex flex-wrap items-center gap-2 border-b border-gray-200 p-2 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex items-center justify-center rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white"
        >
          Format <ChevronDownIcon />
          <span className="sr-only">Format</span>
        </button>

        {openDropdown && (
          <div className="absolute z-10 mt-1 rounded-sm bg-white p-2 shadow-md dark:bg-gray-700">
            <ul className="space-y-1 text-sm font-medium">
              <li>
                <button
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setOpenDropdown(false);
                  }}
                  className="w-full rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                >
                  Paragraph
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setOpenDropdown(false);
                  }}
                  className="w-full rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                >
                  Heading 1
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setOpenDropdown(false);
                  }}
                  className="w-full rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                >
                  Heading 2
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 ${
          editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-600' : ''
        }`}
      >
        <BoldIcon />
        <span className="sr-only">Bold</span>
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 ${
          editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-600' : ''
        }`}
      >
        <ItalicIcon />
        <span className="sr-only">Italic</span>
      </button>

      {/* Strike */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 ${
          editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-600' : ''
        }`}
      >
        <StrikeIcon />
        <span className="sr-only">Strike</span>
      </button>

      {/* Code */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1.5 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 ${
          editor.isActive('code') ? 'bg-gray-200 dark:bg-gray-600' : ''
        }`}
      >
        <CodeIcon />
        <span className="sr-only">Code</span>
      </button>
    </div>
  );
};

export default MenuBar;

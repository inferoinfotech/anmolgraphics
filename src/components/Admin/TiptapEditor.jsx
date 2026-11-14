'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { adminBtnToolbar, adminBtnToolbarMd } from '@/components/Admin/adminButtonClasses';

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'tiptap-content min-h-[150px] p-4 focus:outline-none focus:ring-0',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync value from outside (e.g. when editing a different product)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="border border-ag-border rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-ag-primary/40 focus-within:border-transparent transition">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-ag-mist border-b border-ag-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={adminBtnToolbarMd(editor.isActive('bold'), 'font-bold')}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={adminBtnToolbarMd(editor.isActive('italic'), 'italic')}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={adminBtnToolbarMd(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          • List
        </button>

        <div className="h-6 w-px bg-ag-border mx-1 self-center" />

        {/* Headings */}
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => toggleHeading(level)}
            className={adminBtnToolbar(editor.isActive('heading', { level }))}
            title={`Heading ${level}`}
          >
            H{level}
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
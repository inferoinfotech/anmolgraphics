'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition hover:bg-slate-200/70 ${
            editor.isActive('bold') ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-700'
          }`}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded-lg text-xs italic transition hover:bg-slate-200/70 ${
            editor.isActive('italic') ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-700'
          }`}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded-lg text-xs transition hover:bg-slate-200/70 ${
            editor.isActive('bulletList') ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-700'
          }`}
          title="Bullet List"
        >
          • List
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-1 self-center" />

        {/* Headings */}
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => toggleHeading(level)}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition hover:bg-slate-200/70 ${
              editor.isActive('heading', { level }) ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-500'
            }`}
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

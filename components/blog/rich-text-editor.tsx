"use client";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Color from '@tiptap/extension-color'
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Palette } from 'lucide-react'
import { TextStyle } from '@tiptap/extension-text-style';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
    extensions: [
        StarterKit,
        TextStyle,
        Color,
    ],
    content: content,
    immediatelyRender: false, // <--- İŞTE EKLENMESİ GEREKEN SİHİRLİ SATIR
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
        editorProps: {
            attributes: {
                // Tailwind ile editörün içinin tasarımı (textarea gibi görünmesi için)
                class: 'prose prose-invert max-w-none min-h-[300px] outline-none px-4 py-4 text-sm text-zinc-300',
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all shadow-inner">
            {/* TOOLBAR */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-900/80 border-b border-zinc-800">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    title="Kalın"
                >
                    <Bold size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    title="İtalik"
                >
                    <Italic size={16} />
                </button>
                
                <div className="w-px h-5 bg-zinc-700 mx-1" /> {/* Ayracı */}

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded-lg transition-colors font-bold text-xs ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    title="Başlık 1"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded-lg transition-colors font-bold text-xs ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    title="Başlık 2"
                >
                    H2
                </button>

                <div className="w-px h-5 bg-zinc-700 mx-1" />

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    title="Noktalı Liste"
                >
                    <List size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    title="Numaralı Liste"
                >
                    <ListOrdered size={16} />
                </button>

                <div className="w-px h-5 bg-zinc-700 mx-1" />

                {/* ÖZEL RENKLER (Örn: Worktio Yeşili ve Moru) */}
                <button
                    onClick={() => editor.chain().focus().setColor('#10b981').run()} // Emerald 500 (Yeşil)
                    className="p-2 rounded-lg transition-colors text-emerald-500 hover:bg-zinc-800"
                    title="Yeşil Yazı"
                >
                    <Palette size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#a855f7').run()} // Purple 500 (Mor)
                    className="p-2 rounded-lg transition-colors text-purple-500 hover:bg-zinc-800"
                    title="Mor Yazı"
                >
                    <Palette size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    className="p-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg transition-colors hover:bg-zinc-800 ml-1"
                    title="Rengi Temizle"
                >
                    Temizle
                </button>
            </div>

            {/* YAZI ALANI */}
            <EditorContent editor={editor} />
        </div>
    );
}
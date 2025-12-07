"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

export default function RichTextEditor({ value, onChange }: any) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "border rounded p-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-red-300",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false, // prevents SSR hydration errors
  });

  // Update editor content when quiz changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  return <EditorContent editor={editor} />;
}

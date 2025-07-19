"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { TiptapVeltComments, renderComments, addComment } from "@veltdev/tiptap-velt-comments";
import { useCommentAnnotations } from "@veltdev/react";
import { useEffect } from "react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "./ui/button";

const EDITOR_ID = "customer.io-example"; // ✅ Use a consistent, meaningful ID

const TiptapEditor = () => {
  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      TiptapVeltComments.configure({
        persistVeltMarks: false,
      }),
      StarterKit,
    ],
    content: `
      <p class='text-lg mb-2'>Start composing your email...</p>
      <p class='text-sm'>Click here to start typing or drag content blocks from the sidebar</p>
    `,
    autofocus: true,
  });

  // Get annotations
  const annotations = useCommentAnnotations();

  // Render annotations when editor and annotations are both ready
  useEffect(() => {
    if (editor && annotations?.length) {
      renderComments({
        editor,
        editorId: EDITOR_ID,
        commentAnnotations:annotations
      });
    }
  }, [editor, annotations]);

  // Add comment handler
  const onClickComments = () => {
    if (editor) {
      addComment({
        editor,
        editorId: EDITOR_ID,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Bubble Menu with comment button */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <Button variant="outline" onClick={onClickComments}>
              Add Comment
            </Button>
          </div>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="w-full min-h-56 p-4 border-2 border-dashed border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:bg-blue-50/50"
      />
    </div>
  );
};

export default TiptapEditor;

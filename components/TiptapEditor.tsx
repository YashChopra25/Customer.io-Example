"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import {
  renderComments,
  TiptapVeltComments,
} from "@veltdev/tiptap-velt-comments";
import { StarterKit } from "@tiptap/starter-kit";
import { addComment } from "@veltdev/tiptap-velt-comments";
import { useCommentAnnotations } from "@veltdev/react";
import { useEffect } from "react";
import { Button } from "./ui/button";

const TiptapEditor = () => {
  // Initialize the Tiptap editor with the necessary extensions
  const editor = useEditor({
    extensions: [
      TiptapVeltComments.configure({
        persistVeltMarks: false, // Adjust based on your preference
      }),
      StarterKit, // Basic editor functionality (bold, italic, etc.)
    ],
    content:
      "<p className='text-lg mb-2'>Start composing your email...</p> <p className='text-sm'>Click here to start typing or drag content blocks from the sidebar</p>",
    immediatelyRender: false,
    autofocus: true,
  });

  // Handle comment annotations
  const annotations = useCommentAnnotations();

  // Use the effect hook to render comments if there are any annotations
  useEffect(() => {
    if (editor && annotations?.length) {
      const renderCommentsRequest = {
        editor,
        editorId: "EDITOR_ID", // Replace with your actual editor ID
        annotations,
      };
      renderComments(renderCommentsRequest);
    }
  }, [editor, annotations]);

  // Function to add a comment when the button is clicked
  const onClickComments = () => {
    if (editor) {
      addComment({
        editor: editor,
        editorId: "Demo-q", // This ID should be unique to your editor instance
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Conditional rendering of BubbleMenu for comment actions */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            {/* Add comment button */}
            <Button variant={"outline"} onClick={onClickComments}>
              Add Comment
            </Button>
          </div>
        </BubbleMenu>
      )}
      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="w-full min-h-56 p-4 border-2 border-dashed border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:bg-blue-50/50"
      />
    </div>
  );
};

export default TiptapEditor;

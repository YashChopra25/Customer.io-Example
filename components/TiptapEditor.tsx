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
  const editor = useEditor({
    extensions: [
      TiptapVeltComments.configure({
        persistVeltMarks: false,
      }),
      TiptapVeltComments,
      StarterKit,
    ],
    content:
      "<p className='text-lg mb-2'>Start composing your email...</p> <p className='text-sm'>Click here to start typing or drag content blocks from the sidebar</p>",
    immediatelyRender: false,
    autofocus: true,
  });

  const addCommentRequest = {
    editor,
    editorId: "EDITOR_ID",
    context: {
      storyId: "story-id",
      storyName: "story-name",
    },
  };
  const annotations = useCommentAnnotations();

  useEffect(() => {
    if (editor && annotations?.length) {
      const renderCommentsRequest = {
        editor,
        editorId: "EDITOR_ID",
        annotations,
      };
      renderComments(renderCommentsRequest);
    }
  }, [editor, annotations]);
  const onClickComments = () => {
    console.log("Clikc");
    if (editor) {
      addComment({
        editor: editor,
        editorId: "Demo-q",
      });
      console.log("Added comment");
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      {/* <VeltCommentComposer itemID="container-id" /> */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
         
            <Button variant={"outline"} onClick={onClickComments}>
              Add Comment
            </Button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className="w-full min-h-56 p-4 border-2 border-dashed border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:bg-blue-50/50"
      />
    </div>
  );
};

export default TiptapEditor;



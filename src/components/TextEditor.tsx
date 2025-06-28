import React, { forwardRef } from "react";

// Third-party Imports
import { FormHelperText, FormLabel } from "@mui/material";
import classnames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import CustomIconButton from "@core/components/mui/IconButton";
import type { Editor } from "@tiptap/core";

// Style Imports
import "@/libs/styles/tiptapEditor.css";

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 plb-2 pli-4 border-bs">
      <CustomIconButton
        {...(editor.isActive("bold") && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i
          className={classnames("tabler-bold", {
            "text-textSecondary": !editor.isActive("bold"),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive("underline") && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i
          className={classnames("tabler-underline", {
            "text-textSecondary": !editor.isActive("underline"),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive("italic") && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i
          className={classnames("tabler-italic", {
            "text-textSecondary": !editor.isActive("italic"),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive("strike") && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i
          className={classnames("tabler-strikethrough", {
            "text-textSecondary": !editor.isActive("strike"),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: "left" }) && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <i
          className={classnames("tabler-align-left", {
            "text-textSecondary": !editor.isActive({ textAlign: "left" }),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: "center" }) && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <i
          className={classnames("tabler-align-center", {
            "text-textSecondary": !editor.isActive({ textAlign: "center" }),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: "right" }) && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <i
          className={classnames("tabler-align-right", {
            "text-textSecondary": !editor.isActive({ textAlign: "right" }),
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: "justify" }) && { color: "primary" })}
        variant="tonal"
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <i
          className={classnames("tabler-align-justified", {
            "text-textSecondary": !editor.isActive({ textAlign: "justify" }),
          })}
        />
      </CustomIconButton>
    </div>
  );
};

interface TextEditorProps {
  onChange: (content: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TextEditor = forwardRef(
  (props: TextEditorProps, ref: React.Ref<HTMLDivElement>) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: props?.placeholder || "Content",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Underline,
      ],
      content: props.value || "", // Set the default value here
      onUpdate: ({ editor }) => {
        const content = editor.getHTML();
        props.onChange(content);
      },
      immediatelyRender: false,
    });

    return (
      <div className="flex flex-col gap-2" ref={ref} style={props.style}>
        <FormLabel className={props.error ? "text-error" : ""}>
          {props.label}
        </FormLabel>
        <div
          className={`border rounded-lg overflow-hidden ${props.error ? "border-error" : "border-bs"} ${props.className}`}
        >
          <EditorToolbar editor={editor} />
          <EditorContent
            editor={editor}
            className="bs-[150px] overflow-y-auto flex border-bs"
          />
        </div>
        {props.helperText && (
          <FormHelperText error={props.error}>
            {props.helperText}
          </FormHelperText>
        )}
      </div>
    );
  }
);

// If you need to provide a display name for debugging purposes
TextEditor.displayName = "TextEditor";

export default TextEditor;

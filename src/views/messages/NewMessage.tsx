// React Imports
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  minLength,
  string,
  pipe,
  nonEmpty,
  maxLength,
  custom,
  array,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// MUI Imports
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// Third-party Imports
import classnames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import type { Editor } from "@tiptap/core";

// Component Imports
import CustomIconButton from "@core/components/mui/IconButton";
import CustomTextField from "@core/components/mui/TextField";
// Hook Imports
import { useSettings } from "@core/hooks/useSettings";

// Style Imports
import "@/libs/styles/tiptapEditor.css";

type Props = {
  openCompose: boolean;
  setOpenCompose: (value: boolean) => void;
  isBelowSmScreen: boolean;
  isBelowMdScreen: boolean;
};

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

const NewMessage = (props: Props) => {
  // Props
  const { openCompose, setOpenCompose, isBelowSmScreen, isBelowMdScreen } =
    props;

  // Hooks
  const { settings } = useSettings();

  // Form Schema
  const formSchema = object({
    userType: pipe(
      string(),
      nonEmpty("User type is required"),
      custom(
        (value) => userTypes.some((type) => type.value === (value as string)),
        "Invalid user type"
      )
    ),
    users: array(
      string(),
      "At least one user must be selected"
    ),
    title: pipe(
      string(),
      nonEmpty("Title is required"),
      minLength(3, "Title must be at least 3 characters"),
      maxLength(100, "Title must not exceed 100 characters")
    ),
    subject: pipe(
      string(),
      nonEmpty("Subject is required"),
      minLength(3, "Subject must be at least 3 characters"),
      maxLength(200, "Subject must not exceed 200 characters")
    ),
    message: pipe(
      string(),
      nonEmpty("Message is required"),
      minLength(10, "Message must be at least 10 characters")
    ),
  });

  type FormData = InferInput<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      userType: "managers",
      users: [],
      title: "",
      subject: "",
      message: "",
    },
  });

  // State for user selection
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock data - replace with actual data from your API
  const userTypes = [
    { value: "managers", label: "Managers" },
    { value: "companies", label: "Companies" },
    { value: "mentors", label: "Mentors" },
    { value: "organizations", label: "Organizations" },
  ];

  const mockUsers = {
    managers: ["Manager 1", "Manager 2"],
    companies: ["Company 1", "Company 2", "Company 3"],
    mentors: ["Mentor 1", "Mentor 2", "Mentor 3"],
    organizations: ["Org 1", "Org 2", "Org 3"],
  };

  const handleUserTypeChange = (event: any) => {
    setSelectedUserType(event.target.value);
    setSelectedUsers([]);
  };

  const handleUserChange = (event: any) => {
    setSelectedUsers(event.target.value);
  };

  const handleDelete = (value: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== value));
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
    setOpenCompose(false);
    reset();
  };

  return (
    <Dialog
      open={openCompose}
      onClose={() => {
        setOpenCompose(false);
        reset();
      }}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: isBelowMdScreen ? "calc(100% - 2 * 1.5rem)" : "100%",
          maxWidth: 600,
          borderRadius: "var(--mui-shape-borderRadius)",
          boxShadow:
            settings.skin === "bordered"
              ? "none"
              : "var(--mui-customShadows-xl)",
          border:
            settings.skin === "bordered"
              ? "1px solid var(--mui-palette-divider)"
              : undefined,
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="flex items-center justify-between plb-3.5 pli-6 bg-actionHover">
          <Typography variant="h5" color="text.secondary">
            New Message
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              setOpenCompose(false);
              reset();
            }}
          >
            <i className="tabler-x text-textSecondary" />
          </IconButton>
        </DialogTitle>

        <DialogContent className="p-0">
          {/* User Type Selection */}
          <Controller
            name="userType"
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label="Select User Type"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  handleUserTypeChange(e);
                }}
                error={!!errors.userType}
                helperText={errors.userType?.message}
                className="plb-1 pli-6 border-bs mt-6 mb-3"
              >
                {userTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* User Selection */}
          {selectedUserType && selectedUserType !== "managers" && (
            <Controller
              name="users"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label="Select Users"
                  value={
                    selectedUsers.length
                      ? selectedUsers
                      : [
                          mockUsers[
                            selectedUserType as keyof typeof mockUsers
                          ]?.[0],
                        ]
                  }
                  SelectProps={{
                    multiple: true,
                    onChange: (e) => {
                      field.onChange(e);
                      handleUserChange(e);
                    },
                    renderValue: (selected) => (
                      <div className="flex flex-wrap gap-2">
                        {(selected as string[]).map((value) => (
                          <Chip
                            key={value}
                            clickable
                            onMouseDown={(event) => event.stopPropagation()}
                            size="small"
                            label={value}
                            onDelete={() => handleDelete(value)}
                          />
                        ))}
                      </div>
                    ),
                  }}
                  error={!!errors.users}
                  helperText={errors.users?.message}
                  className="plb-1 pli-6 border-bs mb-3"
                >
                  {mockUsers[selectedUserType as keyof typeof mockUsers]?.map(
                    (user) => (
                      <MenuItem key={user} value={user}>
                        {user}
                      </MenuItem>
                    )
                  )}
                </CustomTextField>
              )}
            />
          )}

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label="Title"
                placeholder="Enter title"
                {...field}
                error={!!errors.title}
                helperText={errors.title?.message}
                className="plb-1 pli-6 border-bs mb-3"
              />
            )}
          />

          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                label="Subject"
                placeholder="Enter subject"
                {...field}
                error={!!errors.subject}
                helperText={errors.subject?.message}
                className="plb-1 pli-6 border-bs mb-3"
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            render={({ field }) => {
              const editor = useEditor({
                extensions: [
                  StarterKit,
                  Placeholder.configure({
                    placeholder: "Message",
                  }),
                  TextAlign.configure({
                    types: ["heading", "paragraph"],
                  }),
                  Underline,
                ],
                onUpdate: ({ editor }) => {
                  const content = editor.getHTML();
                  field.onChange(content);
                },
              });

              return (
                <div className="mx-6">
                  <div className="border rounded-md">
                    <EditorToolbar editor={editor} />
                    <EditorContent
                      editor={editor}
                      className="bs-[150px] overflow-y-auto flex border-bs"
                    />
                  </div>
                  {errors.message && (
                    <Typography color="error" className="pt-2">
                      {errors.message.message}
                    </Typography>
                  )}
                </div>
              );
            }}
          />
        </DialogContent>

        <DialogActions className="plb-4 pli-5 flex justify-end">
          <Button
            type="submit"
            variant="contained"
            endIcon={<i className="tabler-send" />}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewMessage;

"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, pipe, nonEmpty, minLength, maxLength } from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import CustomTextField from "@core/components/mui/TextField";
import TextEditor from "@/components/TextEditor";

// Interface for the ServiceRequest
interface Vendor {
  name: string;
  email: string;
  phone: string;
}

interface ServiceRequestType {
  serviceName: string;
  comment: string;
  vendor: Vendor;
  createdAt: string;
}

// Define the schema for form validation
const messageSchema = object({
  subject: pipe(
    string(),
    nonEmpty("Subject is required"),
    minLength(5, "Subject must be at least 5 characters"),
    maxLength(100, "Subject must not exceed 100 characters")
  ),
  message: pipe(
    string(),
    // nonEmpty("Message is required"),
    // minLength(10, "Message must be at least 10 characters"),
    maxLength(2000, "Message must not exceed 2000 characters")
  ),
});

// Create a type based on the schema
type MessageFormInputs = InferInput<typeof messageSchema>;

// Default form values
const defaultValues: MessageFormInputs = {
  subject: "",
  message: "",
};

interface SendMessageDialogProps {
  open: boolean;
  onClose: () => void;
  serviceRequest: ServiceRequestType | null;
  onSend: (data: MessageFormInputs, serviceRequest: ServiceRequestType) => void;
}

const SendMessageDialog = ({
  open,
  onClose,
  serviceRequest,
  onSend,
}: SendMessageDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormInputs>({
    defaultValues,
    resolver: valibotResolver(messageSchema),
  });

  // Form submission handler
  const onFormSubmit: SubmitHandler<MessageFormInputs> = (formData) => {
    if (serviceRequest) {
      onSend(formData, serviceRequest);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  // Don't render if there's no service request
  if (!serviceRequest) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "auto" } }}
      fullWidth
      // Make the dialog full screen on mobile devices
      aria-labelledby="user-dialog-title"
      fullScreen={typeof window !== undefined ? window.innerWidth < 600 : false}
      scroll="paper"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle>Send Message to {serviceRequest.vendor.name}</DialogTitle>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Subject */}
            <Grid item xs={12}>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Subject"
                    placeholder="Enter message subject"
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  />
                )}
              />
            </Grid>

            {/* Message */}
            <Grid item xs={12}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextEditor
                    label="Message"
                    placeholder="Enter your message"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="mt-8">
          <Button variant="text" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            endIcon={<i className="tabler-send" />}
          >
            Send Message
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SendMessageDialog;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface WarningDialogProps {
  type: "Delete" | "Confirm";
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningDialog = (props: WarningDialogProps) => {
  const { title, message, type, open, onClose, onConfirm } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color={type === "Delete" ? "error" : "primary"}
        >
          {type === "Delete" ? "Delete" : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;

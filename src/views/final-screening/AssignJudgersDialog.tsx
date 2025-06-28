"use client";

// React Imports
import React, { useState, useEffect } from "react";

// MUI Imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

// Types Imports
import { FinalScreeningStartupType } from "@/types/finalScreeningTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

interface AssignJudgersDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (judgerIds: string[]) => void;
  startup: FinalScreeningStartupType | null;
  judgers: string[];
}

const AssignJudgersDialog: React.FC<AssignJudgersDialogProps> = ({
  open,
  onClose,
  onSubmit,
  startup,
  judgers,
}) => {
  const [selectedJudgers, setSelectedJudgers] = useState<string[]>([]);

  useEffect(() => {
    if (startup) {
      setSelectedJudgers(startup.assignedJudgers);
    } else {
      setSelectedJudgers([]);
    }
  }, [startup]);

  const handleSubmit = () => {
    onSubmit(selectedJudgers);
    onClose();
  };

  const handleClose = () => {
    setSelectedJudgers(startup?.assignedJudgers || []);
    onClose();
  };

  if (!startup) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle>Assign Judgers</DialogTitle>
      <DialogContent>
        {/* Startup Info */}
        <Box sx={{ mb: 4, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              src={startup.logo}
              alt={startup.name}
              sx={{ width: 40, height: 40 }}
            >
              {startup.name.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <Typography variant="h6">{startup.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {startup.sector}
              </Typography>
            </div>
          </Box>
          <Typography variant="body2" gutterBottom>
            <strong>Founders:</strong> {startup.founders.join(", ")}
          </Typography>
        </Box>

        {/* Current Assignments */}
        {startup.assignedJudgers.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" gutterBottom>
              Currently Assigned Judgers:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {startup.assignedJudgers.map((judger) => (
                <Chip key={judger} label={judger} size="small" />
              ))}
            </Box>
          </Box>
        )}

        {/* Judger Selection */}
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel>Select Judgers</InputLabel>
          <Select
            multiple
            value={selectedJudgers}
            onChange={(e) => setSelectedJudgers(e.target.value as string[])}
            input={<OutlinedInput label="Select Judgers" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {judgers.map((judger) => (
              <MenuItem key={judger} value={judger}>
                <Checkbox checked={selectedJudgers.indexOf(judger) > -1} />
                <ListItemText primary={judger} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ mt: 1, display: "block" }}
        >
          Select multiple judgers to assign to this startup
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={selectedJudgers.length === 0}
        >
          Assign Judgers
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignJudgersDialog;

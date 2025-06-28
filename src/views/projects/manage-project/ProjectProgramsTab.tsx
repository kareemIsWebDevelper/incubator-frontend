"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CustomChip from "@/@core/components/mui/Chip";
import WarningDialog from "@/components/dialogs/WarningDialog";
import CustomTextField from "@/@core/components/mui/TextField";
import { ProjectType } from "@/types/projectTypes";
import { ProgramType } from "@/types/programTypes";

interface ProjectProgramsTabProps {
  project: ProjectType;
}

export default function ProjectProgramsTab({
  project,
}: ProjectProgramsTabProps) {
  const [programs, setPrograms] = useState<ProgramType[]>(project.programs);
  const [availablePrograms, setAvailablePrograms] = useState<ProgramType[]>([
    { id: "prog_4", title: "User Testing", status: "planning" },
    { id: "prog_5", title: "Analytics Setup", status: "not-started" },
    { id: "prog_6", title: "Performance Optimization", status: "not-started" },
  ]);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [unlinkDialogOpen, setUnlinkDialogOpen] = useState<boolean>(false);
  const [programToUnlink, setProgramToUnlink] = useState<
    string | number | null
  >(null);

  const getStatusBadge = (status: ProgramType["status"]) => {
    switch (status) {
      case "completed":
        return <CustomChip label="Completed" color="success" variant="tonal" />;
      case "in-progress":
        return (
          <CustomChip label="In Progress" color="primary" variant="tonal" />
        );
      case "planning":
        return (
          <CustomChip label="Planning" color="secondary" variant="tonal" />
        );
      default:
        return <CustomChip label="Not Started" variant="tonal" />;
    }
  };

  const handleLinkProgram = () => {
    if (!selectedProgram) {
      alert("Please select a program to link.");
      return;
    }

    const programToLink = availablePrograms.find(
      (p) => p.id === selectedProgram
    );
    if (programToLink) {
      setPrograms([...programs, programToLink]);
      setAvailablePrograms(
        availablePrograms.filter((p) => p.id !== selectedProgram)
      );
      setSelectedProgram("");
    }
  };

  const handleUnlinkProgram = (programId: string) => {
    const programToUnlink = programs.find((p) => p.id === programId);
    if (programToUnlink) {
      setPrograms(programs.filter((p) => p.id !== programId));
      setAvailablePrograms([...availablePrograms, programToUnlink]);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h6">Linked Programs</Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<i className="tabler-link" />}
        >
          Link Program
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>Link Program to Project</DialogTitle>
          <DialogContent>
            <DialogContentText gutterBottom>
              Select a program to link to this project.
            </DialogContentText>
            <CustomTextField
              fullWidth
              select
              placeholder="Select a program"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              {availablePrograms.map((program) => (
                <MenuItem key={program.id} value={program.id}>
                  {program.title}
                </MenuItem>
              ))}
            </CustomTextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleLinkProgram();
                setOpen(false);
              }}
              color="primary"
            >
              Link Program
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {programs.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography>No programs linked to this project yet.</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setOpen(true)}
          >
            Link a Program
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Link Program to Project</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Select a program to link to this project.
              </DialogContentText>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select a program</InputLabel>
                <Select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  {availablePrograms.map((program) => (
                    <MenuItem key={program.id} value={program.id}>
                      {program.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleLinkProgram()} color="primary">
                Link Program
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {programs.map((program: ProgramType) => (
            <Grid item xs={12} md={6} lg={4} key={program.id}>
              <Card>
                <CardHeader title={program.title} />

                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">Status:</Typography>
                    {getStatusBadge(program.status)}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<i className="tabler-unlink" />}
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setProgramToUnlink(program.id);
                      setUnlinkDialogOpen(true);
                    }}
                  >
                    Unlink
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Unlink confirmation dialog */}
      <WarningDialog
        type="Confirm"
        open={unlinkDialogOpen}
        onClose={() => setUnlinkDialogOpen(false)}
        title="Unlink Program"
        message="Are you sure you want to unlink this program from the project? This action won't delete the program."
        onConfirm={() => {
          handleUnlinkProgram(programToUnlink as string);
          setUnlinkDialogOpen(false);
        }}
      />
    </Box>
  );
}

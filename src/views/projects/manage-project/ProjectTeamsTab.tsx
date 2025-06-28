"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CustomTextField from "@/@core/components/mui/TextField";
import { Card, CardContent } from "@mui/material";
import WarningDialog from "@/components/dialogs/WarningDialog";
import { ProjectType, TeamMemberType } from "@/types/projectTypes";

interface ProjectTeamTabProps {
  project: ProjectType;
}

export default function ProjectTeamTab({ project }: ProjectTeamTabProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>(
    project.teamMembers
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMember, setNewMember] = useState<TeamMemberType>({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const filteredMembers = teamMembers.filter((member) => {
    if (member.name && member.email) {
      return (
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) return;

    const newId = `user_${teamMembers.length + 1}`;
    setTeamMembers([...teamMembers, { ...newMember, id: newId }]);
    setNewMember({ id: "", name: "", email: "", role: "" });
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
    setRemoveDialogOpen(false);
    setMemberToRemove(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "start", sm: "center" },
          gap: 2,
        }}
      >
        <Box sx={{ position: "relative", width: { xs: "100%", sm: "256px" } }}>
          <CustomTextField
            fullWidth
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="tabler-search" style={{ fontSize: "1rem" }}></i>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={() => setAddDialogOpen(true)}
          startIcon={
            <i className="tabler-user-plus" style={{ fontSize: "1rem" }}></i>
          }
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add Team Member
        </Button>

        <Dialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          fullWidth
        >
          <DialogTitle mb={-4}>Add Team Member</DialogTitle>
          <DialogContent>
            <DialogContentText gutterBottom>
              Add a new team member to this project.
              <br /> They will receive an email invitation.
            </DialogContentText>
            <Box sx={{ display: "grid", gap: 2, pt: 2 }}>
              <CustomTextField
                fullWidth
                label="Name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
              <CustomTextField
                fullWidth
                label="Email"
                type="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
              />
              <CustomTextField
                select
                fullWidth
                label="Role"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    role: e.target.value as string,
                  })
                }
              >
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="Content Writer">Content Writer</MenuItem>
                <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                <MenuItem value="Stakeholder">Stakeholder</MenuItem>
              </CustomTextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialogOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleAddMember();
                setAddDialogOpen(false);
              }}
              variant="contained"
            >
              Add Member
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Card>
        <CardContent>
          {filteredMembers.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                border: "1px dashed rgba(0,0,0,0.12)",
                borderRadius: 1,
              }}
            >
              {searchQuery ? (
                <Typography color="text.secondary">
                  No team members match your search.
                </Typography>
              ) : (
                <>
                  <Typography color="text.secondary">
                    No team members in this project yet.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setAddDialogOpen(true)}
                    sx={{ mt: 2 }}
                    startIcon={
                      <i
                        className="tabler-plus"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    }
                  >
                    Add Team Member
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar sx={{ width: 40, height: 40 }}>
                          {member.name ? getInitials(member.name) : ""}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {member.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {member.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          setMemberToRemove(member.id);
                          setRemoveDialogOpen(true);
                        }}
                        size="small"
                      >
                        <i
                          className="tabler-user-minus"
                          style={{ fontSize: "1rem" }}
                        ></i>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <WarningDialog
        type="Delete"
        open={removeDialogOpen}
        onClose={() => {
          setRemoveDialogOpen(false);
          setMemberToRemove(null);
        }}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${
          memberToRemove
            ? teamMembers.find((m) => m.id === memberToRemove)?.name
            : ""
        } from this project? They will no longer have access to this project.`}
        onConfirm={() => {
          if (memberToRemove) handleRemoveMember(memberToRemove);
        }}
      />
    </Box>
  );
}

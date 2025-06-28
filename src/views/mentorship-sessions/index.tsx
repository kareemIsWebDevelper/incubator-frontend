"use client";

// React Import
import React, { useState } from "react";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import MentorshipSessionDialog from "./MentorshipSessionDialog";
import MentorshipSessionCard from "./MentorshipSessionCard";

// Data Imports
import {
  mockSessions,
  mockUsers,
  mockPrograms,
} from "@/fake-db/pages/mentorshipSessions";

const MentorshipSessions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredSessions = mockSessions.filter((session) => {
    const mentor = mockUsers.find((u) => u.id === session.mentorId);
    const startup = mockUsers.find((u) => u.id === session.startupOwnerId);
    const program = mockPrograms.find((p) => p.id === session.programId);

    const searchMatch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "all" || session.status === statusFilter;

    const programMatch =
      programFilter === "all" || session.programId === programFilter;

    return searchMatch && statusMatch && programMatch;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Mentorship Sessions</h1>
            <p className="text-gray-600">
              Manage and track mentorship sessions between mentors and startups
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="tonal"
              href="/mentors"
              startIcon={<i className="tabler-users" />}
              onClick={() => {
                // Navigate to mentors page
                window.location.href = "/mentors";
              }}
            >
              See Mentors
            </Button>
            <Button
              href="/startups"
              variant="tonal"
              startIcon={<i className="tabler-building" />}
            >
              See Startups
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowCreateModal(true)}
              startIcon={<i className="tabler-plus" />}
            >
              Create Session
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 lg:flex-none lg:w-1/2">
                <CustomTextField
                  placeholder="Search sessions, mentors, or startups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  InputProps={{
                    startAdornment: (
                      <i className="tabler-search w-4 h-4 text-gray-400 mr-2" />
                    ),
                  }}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-2 items-center">
                {/* Status Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </CustomTextField>

                {/* Program Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by program"
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Programs</MenuItem>
                  {mockPrograms.map((program) => (
                    <MenuItem key={program.id} value={program.id}>
                      {program.name}
                    </MenuItem>
                  ))}
                </CustomTextField>

                {/* Clear Filters */}
                {(searchTerm ||
                  statusFilter !== "all" ||
                  programFilter !== "all") && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setProgramFilter("all");
                    }}
                    className="lg:w-auto"
                    startIcon={
                      <i className="tabler-wash-dryclean-off w-4 h-4" />
                    }
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredSessions.length} mentorship sessions
          </p>
        </div>

        {/* Mentorship Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => {
            const mentor = mockUsers.find((u) => u.id === session.mentorId);
            const startup = mockUsers.find(
              (u) => u.id === session.startupOwnerId
            );
            const program = mockPrograms.find(
              (p) => p.id === session.programId
            );

            return (
              <MentorshipSessionCard
                key={session.id}
                session={session}
                mentor={mentor}
                startup={startup}
                program={program}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <i className="tabler-calendar-off w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No mentorship sessions found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or create a new mentorship
                session.
              </p>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setProgramFilter("all");
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Session Modal */}
      <MentorshipSessionDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        onSubmit={(sessionData) => {
          console.log("Creating session:", sessionData);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default MentorshipSessions;

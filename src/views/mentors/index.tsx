"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import MentorCard from "./MentorCard";

// Types
import { Mentor } from "@/types/MentorTypes";
import ListHeaderComponent from "@/components/ListHeaderComponent";

type MentorsProps = {
  mentors: Mentor[];
  isRegistered?: boolean;
  isMentor?: boolean;
  isAdmin?: boolean;
  hasCompany?: boolean;
  companyCycle?: number;
  language?: string;
};

const Mentors = ({
  mentors,
  isRegistered = false,
  isMentor = false,
  isAdmin = false,
  hasCompany = false,
  companyCycle = 0,
}: MentorsProps) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleRequest = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    // TODO: Implement request functionality
  };

  const onFilter = (filterValue: string) => {
    setFilterValue(filterValue);
  };

  const onSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListHeaderComponent
          title="Mentors"
          count={mentors.length}
          icon={<i className="tabler-users text-2xl text-primary" />}
          onSearch={onSearch}
          onFilter={onFilter}
          filterOptions={[
            // { value: "all", label: "All" },
            { value: "recent", label: "Recent" },
            { value: "private", label: "Private" },
            { value: "not-private", label: "Not Private" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {mentors.map((mentor) => (
            <Grid item xs={12} md={4} key={mentor.id}>
              <MentorCard
                mentor={mentor}
                hasCompany={hasCompany}
                companyCycle={companyCycle}
                isRegistered={isRegistered}
                isMentor={isMentor}
                isAdmin={isAdmin}
                handleRequest={handleRequest}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Mentors;

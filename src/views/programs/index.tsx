"use client";

import { Grid } from "@mui/material";
import ProgramList from "./ProgramList";
import ListHeaderComponent from "@/components/ListHeaderComponent";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/fake-db/pages/program";
import { useCallback, useMemo, useState } from "react";
import { ProgramType } from "@/types/programTypes";

const Programs = () => {
  const router = useRouter();
  const params = useParams();

  const { lang: locale } = params;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  // Memoize the programs data to prevent unnecessary re-renders
  const programs = useMemo(() => db, []);

  // Optimize filtering with useCallback and useMemo
  const filterPrograms = useCallback(
    (programs: ProgramType[], term: string) => {
      if (!term) return programs;
      return programs.filter((program) =>
        program.title?.toLowerCase().includes(term.toLowerCase())
      );
    },
    []
  );

  const filteredPrograms = useMemo(
    () => filterPrograms(programs, searchTerm),
    [filterPrograms, searchTerm, programs]
  );

  // Use useCallback to prevent recreation of this function on each render
  const onSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const onFilter = useCallback((filterValue: string) => {
    setFilterValue(filterValue);
  }, []);

  // Use useCallback for navigation to prevent function recreation
  const handleAddNew = useCallback(() => {
    router.push(`/${locale}/programs/new`);
  }, [router, locale]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListHeaderComponent
          title="Programs"
          icon={<i className="tabler-components text-primary text-3xl" />}
          count={filteredPrograms.length} // Dynamic count based on filtered results
          onAddNewClick={handleAddNew}
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
        <ProgramList programs={filteredPrograms} />
      </Grid>
    </Grid>
  );
};

export default Programs;

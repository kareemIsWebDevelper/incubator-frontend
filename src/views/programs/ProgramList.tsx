import { ProgramType } from "@/types/programTypes";
import ProgramCard from "@/views/programs/ProgramCard";
import { Grid } from "@mui/material";

const ProgramList = ({ programs }: { programs: Array<ProgramType> }) => {
  return (
    <Grid container spacing={6}>
      {programs.map((program, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <ProgramCard program={program} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProgramList;

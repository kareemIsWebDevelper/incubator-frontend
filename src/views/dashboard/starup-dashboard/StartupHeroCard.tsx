// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const StartupHeroCard = () => {
  return (
    <Card className="h-full">
      <Grid container>
        <Grid item xs={8}>
          <CardContent className="flex flex-col justify-between h-full">
            <div>
              <Typography variant="h5" fontWeight="bold" className="mbe-0.5">
                Innovative Solutions
              </Typography>
              <Typography variant="subtitle1" className="mbe-2">
                Your startup has achieved a significant milestone!
              </Typography>

              {/* <Typography variant='h4' color='primary.main' className='mbe-1'>
              $48.9k
            </Typography> */}
            </div>
            <div className="mt-4">
              <Button variant="contained" color="primary" className="">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <div className="relative bs-full is-full">
            <img
              alt="Startup Hero Illustration"
              src="/images/illustrations/characters/startup-hero-illus.svg"
              className="max-bs-[200px] absolute inline-end-6 max-is-full w-full h-full object-cover"
              // className="max-bs-[200px] absolute block-end-0 inline-end-6 max-is-full w-[250px] h-[250px] object-contain"
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default StartupHeroCard;

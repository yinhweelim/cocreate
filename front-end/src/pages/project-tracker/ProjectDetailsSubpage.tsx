import { Stack, Box, Typography, Paper, Grid } from "@mui/material";
import BriefDetails from "../../components/BriefDetails";

const ProjectDetailsSubpage = (props: any) => {
  return (
    <>
      <Grid container paddingTop={2} direction="column">
        <Stack direction="column" spacing={3}>
          {/* proposal */}
          {/* 
          <Paper variant="outlined">
            <Box padding={2}>
              <Typography variant="h6">proposal</Typography>
              <Typography variant="body1">
                Accepted by PATRON on TIME
              </Typography>
              <Typography variant="body1">
                Estimated delivery date: TIME
              </Typography>
              <br />
              <Typography variant="overline">Creator notes</Typography>
              <Typography variant="body1">XXXX</Typography>
              <br />
              <Typography variant="overline">Price</Typography>
              <Typography variant="subtitle1">Project: XXX</Typography>
              <Typography variant="subtitle1">Add-ons: XXX</Typography>
              <Typography variant="subtitle1">Delivery: XXX</Typography>
              <Typography variant="body1">Total: XXX</Typography>
              <br />
              <Typography variant="overline">DESIGN</Typography>
              <Box>IMAGE</Box>
            </Box>
          </Paper> */}

          {/* initial brief */}
          <Paper variant="outlined">
            <Box padding={2}>
              <Typography variant="h6">The brief</Typography>
              {/* JSON.stringify(props.briefData) */}
              <BriefDetails brief={props.briefData}></BriefDetails>
            </Box>
          </Paper>
        </Stack>
      </Grid>
    </>
  );
};

export default ProjectDetailsSubpage;

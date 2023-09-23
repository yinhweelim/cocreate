import { ReactNode } from "react";
import { Typography, Stack, Grid } from "@mui/material";

const SectionSubpages = (props: {
  actionButton: ReactNode | undefined;
  heading: string | undefined;
}) => {
  return (
    <>
      <Grid
        container
        sx={{ flexDirection: "row", justifyContent: "space-between" }}
        paddingY={2}
      >
        <Typography variant="h4">{props.heading}</Typography>
        <Stack>{props.actionButton}</Stack>
      </Grid>
    </>
  );
};

export default SectionSubpages;

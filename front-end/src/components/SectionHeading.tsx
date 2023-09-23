import { ReactNode } from "react";
import { Typography, Stack, Grid } from "@mui/material";

const SectionHeading = (props: {
  actionButton: ReactNode | undefined;
  heading: string | undefined;
}) => {
  return (
    <>
      <Grid
        container
        sx={{ flexDirection: "row", justifyContent: "space-between" }}
        paddingY={3}
      >
        <Typography variant="h4">{props.heading}</Typography>
        <Stack>{props.actionButton}</Stack>
      </Grid>
    </>
  );
};

export default SectionHeading;

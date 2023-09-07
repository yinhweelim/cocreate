import React, { ReactNode } from "react";
import { Typography, Box, Stack, Button, Divider } from "@mui/material";

const SectionHeading = (props: {
  actionButton: ReactNode | undefined;
  heading: string | undefined;
}) => {
  return (
    <>
      <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        …<Typography variant="h4">{props.heading}</Typography>
        <Stack>{props.actionButton}</Stack>
      </Box>
    </>
  );
};

export default SectionHeading;

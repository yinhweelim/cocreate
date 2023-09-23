import { Paper, Stack, Typography } from "@mui/material";
interface ProjectStages {
  index?: number;
  name?: String;
  description?: String;
  time_estimate_unit?: String;
  time_estimate_start?: number;
  time_estimate_end?: number;
}

const CreatorPageProjectStages = (props: ProjectStages) => {
  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <Stack direction="row" margin={1}>
          {/* <IconButton>
            <DragHandleIcon></DragHandleIcon>
          </IconButton> */}
          <Stack paddingLeft={2}>
            <Typography variant="overline"> {props.name}</Typography>
            <Typography variant="body1"> {props.description}</Typography>
            {props.time_estimate_end ? (
              <Typography variant="subtitle1" color="primary">
                {props.time_estimate_start} - {props.time_estimate_end}{" "}
                {props.time_estimate_unit}
              </Typography>
            ) : (
              <Typography variant="subtitle1" color="primary">
                {props.time_estimate_start} {props.time_estimate_unit}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default CreatorPageProjectStages;

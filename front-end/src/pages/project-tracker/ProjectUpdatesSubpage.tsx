import React, { useContext } from "react";
import SocketContext from "../../context/SocketContext";
import { Typography } from "@mui/material";
export interface ProjectUpdatesProps {}

const ProjectUpdatesSubpage: React.FunctionComponent<ProjectUpdatesProps> = (
  props
) => {
  const { socket, uid, users } = useContext(SocketContext).SocketState;

  return (
    <>
      <Typography variant="h6">Socket IO information</Typography>

      <Typography variant="body1">User Id:{uid} </Typography>
      <Typography variant="body1">Users online:{users.length}</Typography>
      <Typography variant="body1">Socket ID:{socket?.id}</Typography>
    </>
  );
};

export default ProjectUpdatesSubpage;

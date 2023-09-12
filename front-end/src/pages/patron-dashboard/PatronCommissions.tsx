import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Box, Grid, Button, Stack, Divider, Typography } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import { data } from "../../interfaces";
import ProjectBriefCard from "../../components/ProjectBriefCard";
const PatronCommissions = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [briefs, setBriefs] = useState([]);
  const patronId: string = userCtx?.currentUser.user_id;

  //fetch briefs
  const getBriefs = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData(
        "/api/projects/briefs/patrons/" + patronId
      );
      setBriefs(res.data.briefs);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBriefs();
  }, []);

  //delete brief
  const handleCancelBrief = async (briefId: string) => {
    console.log(`Cancel brief with ID: ${briefId}`);

    // const res: data = await fetchData(
    //   "/api/creators/products/" + productId,
    //   "DELETE",
    //   undefined,
    //   undefined
    // );

    // if (res.ok) {
    //   showSnackbar("Product deleted successfully", "success");
    //   getProducts();
    // } else {
    //   console.log(JSON.stringify(res.data));
    //   showSnackbar("Failed to delete product", "warning");
    // }
  };

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  } else
    return (
      <>
        {/* {JSON.stringify(briefs)} */}
        <Grid container direction="column">
          {/* header with action buttons */}
          <SectionHeading
            heading={"Your Commissions"}
            actionButton={null}
          ></SectionHeading>

          <Divider />

          {/* page content */}
          <Grid container paddingY={4}>
            <Grid container flexDirection="column" rowSpacing={2}>
              <Stack paddingLeft={2} paddingBottom={2}>
                <Typography variant="h6" paddingY={2}>
                  Project Briefs
                </Typography>
                <Grid container flexDirection={"row"} spacing={1}>
                  {briefs?.map((data: any, index: number) => (
                    <ProjectBriefCard
                      key={index}
                      {...data}
                      cardHeight="250"
                      onDelete={() => handleCancelBrief(data.id)}
                    />
                  ))}
                </Grid>
              </Stack>

              <Divider />
              <Stack paddingLeft={2} paddingTop={2}>
                <Typography variant="h6" paddingY={2}>
                  Confirmed projects
                </Typography>

                <Grid container flexDirection={"row"} spacing={1}>
                  {briefs?.map((data: any, index: number) => (
                    <ProjectBriefCard
                      key={index}
                      {...data}
                      cardHeight="250"
                      onDelete={() => handleCancelBrief(data.id)}
                    />
                  ))}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
};

export default PatronCommissions;

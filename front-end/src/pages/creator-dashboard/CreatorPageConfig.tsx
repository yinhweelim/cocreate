import { useState, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { data, CreatorData } from "../../interfaces";
import UserContext from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarContext";

import { Grid, Button, Stack, Divider } from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import CreatorProfileSubpage from "./CreatorProfileSubpage";
import CreatorProjectConfig from "./CreatorProjectConfigSubpage";
import { useNavigate } from "react-router-dom";

const CreatorPageConfig = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // creator data state variables
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId: string = userCtx?.currentUser.creator_id;

  //subpage handling
  const [selectedSubpage, setSelectedSubpage] =
    useState<String>("business_profile");

  const handleSubpageChange = (subpage: String) => {
    setSelectedSubpage(subpage);
  };

  //fetch creator data on first mount
  const getCreatorData = async () => {
    // Set isLoading to true before making the API call
    setIsLoading(true);

    try {
      const res: data = await fetchData("/api/creators/" + creatorId);
      setCreatorData(res.data.creator);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCreatorData();
  }, []);

  //update creator data
  const handleUpdateCreator = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    interface UpdateProfileRequestBody {
      project_description_guideline?: string | null;
      payment_instructions?: string | null;
      lead_time_in_weeks?: number | null;
      slots_per_month?: number | null;
      display_name?: string | null;
      tagline?: string | null;
      country_of_operation?: string | null;
      about?: string | null;
    }

    const requestBody: UpdateProfileRequestBody = {};

    const display_name = data.get("pageName");
    if (display_name) {
      requestBody.display_name = display_name.toString();
    }

    const tagline = data.get("tagline");
    if (tagline) {
      requestBody.tagline = tagline.toString();
    }

    const country_of_operation = data.get("country");
    if (country_of_operation) {
      requestBody.country_of_operation = country_of_operation.toString();
    }

    const about = data.get("about");
    if (about) {
      requestBody.about = about.toString();
    }

    const project_description_guideline = data.get("briefDescriptionGuide");
    if (project_description_guideline) {
      requestBody.project_description_guideline =
        project_description_guideline.toString();
    }

    const payment_instructions = data.get("paymentInstructions");
    if (payment_instructions) {
      requestBody.payment_instructions = payment_instructions.toString();
    }

    const lead_time_in_weeks = data.get("leadTime");
    if (lead_time_in_weeks) {
      requestBody.lead_time_in_weeks = parseInt(lead_time_in_weeks.toString());
    }

    const slots_per_month = data.get("slotsPerMonth");
    if (slots_per_month) {
      requestBody.slots_per_month = parseInt(slots_per_month.toString());
    }

    const res: data = await fetchData(
      "/api/creators/" + creatorId,
      "PATCH",
      requestBody
    );
    if (res.ok) {
      showSnackbar("Project settings updated successfully", "success");
      getCreatorData();
    } else {
      console.log(JSON.stringify(res.data));
      showSnackbar("Project settings update failed", "warning");
    }
  };

  return (
    <>
      <Grid container direction="column">
        {/* header with action buttons */}
        <SectionHeading
          heading={"My page"}
          actionButton={
            <Button
              variant="contained"
              onClick={() => navigate(`/creators/${creatorId}`)}
            >
              View Page
            </Button>
          }
        ></SectionHeading>

        {/* subpages */}
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("business_profile")}
          >
            Business Profile
          </Button>
          <Button
            variant="text"
            onClick={() => handleSubpageChange("project_settings")}
          >
            Project Settings
          </Button>
        </Stack>

        <Divider />

        {/* page content */}

        {selectedSubpage === "business_profile" ? (
          <CreatorProfileSubpage
            creatorId={creatorId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleUpdateCreator={handleUpdateCreator}
            creatorData={creatorData}
            getCreatorData={getCreatorData}
          />
        ) : (
          <CreatorProjectConfig
            creatorId={creatorId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleUpdateCreator={handleUpdateCreator}
            creatorData={creatorData}
          />
        )}
      </Grid>
    </>
  );
};

export default CreatorPageConfig;

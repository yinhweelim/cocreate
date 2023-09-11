import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CreatorData, data } from "../../interfaces";

const CreatorPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const creatorId = userCtx?.currentUser.creator_id;

  return <>Creator page</>;
};

export default CreatorPage;

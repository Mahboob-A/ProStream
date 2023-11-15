import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";

const SocialMedia = () => {
  const [socialLink, setSocialLink] = React.useState({});
  let { access_token } = getToken();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/social-media-links/api/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("social", response.data.data);
        setSocialLink(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert(error.response.data);
      });
  }, []);
  console.log("socialLink", socialLink);
  return <div>Social Media</div>;
};

export default SocialMedia;

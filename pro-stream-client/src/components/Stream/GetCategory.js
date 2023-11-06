import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toolbar } from "@mui/material";

const GetCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/live-chat/category-crud/api/"
        );
        console.log(response.data.data);
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Rendering the fetched data
  return (
    <div style={{ background: "white" }}>
      <Toolbar />
      <Toolbar />
      <h1>List of Games</h1>

      <ul>
        {category?.map((game) => (
          <li key={game?.id}>
            <h2>{game?.name}</h2>
            <p>Language: {game?.language}</p>
            <p>Views: {game?.total_views_count}</p>
            <p>Followers: {game?.total_followers}</p>
            <p>Created At: {new Date(game?.createdAt).toLocaleString()}</p>
            {/* Add other details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCategory;

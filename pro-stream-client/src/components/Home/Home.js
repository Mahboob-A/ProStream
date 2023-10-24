import { Box, Toolbar } from "@mui/material";
import NavBar from "../Common/NavBar";
import MiniDrawer from "./MiniDrawer";

const Home = () => {
  return (
    <Box>
      <NavBar />
      {/* <Toolbar /> */}
      <MiniDrawer />
    </Box>
  );
};

export default Home;

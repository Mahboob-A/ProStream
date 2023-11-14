import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Toolbar, Typography } from "@mui/material";
import Profile from "./Profile";
import VerifyAndBankAcc from "./VerifyAndBankAcc";
import Team from "./Team";
import Analytics from "./Analytics";
import SocialMedia from "./SocialMedia";
import WalletAndWithdrawl from "./WalletAndWithdrawl";
import ScheduleStream from "./ScheduleStream";
import PrivacyAndWarnings from "./PrivacyAndWarnings";
import UserProfile from "./UserProfile";

export default function UserDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return (
          <Box sx={{ color: "white" }}>
            <UserProfile />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ color: "white" }}>
            <VerifyAndBankAcc />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ color: "white" }}>
            <Team />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ color: "white" }}>
            <Analytics />
          </Box>
        );
      case 4:
        return (
          <Box sx={{ color: "white" }}>
            <SocialMedia />
          </Box>
        );
      case 5:
        return (
          <Box sx={{ color: "white" }}>
            <WalletAndWithdrawl />
          </Box>
        );
      case 6:
        return (
          <Box sx={{ color: "white" }}>
            <ScheduleStream />
          </Box>
        );
      case 7:
        return (
          <Box sx={{ color: "white" }}>
            <PrivacyAndWarnings />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "black" }} padding={2}>
      <Toolbar />
      <Typography variant="h4" color="white">
        User Dashboard
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          "& .MuiButtonBase-root.MuiTabScrollButton-root": {
            color: "white",
            // backgroundColor: "black",
          },
          borderBottom: 1,
          borderColor: "gray",
        }}
      >
        <Tab label="Edit Profile" sx={{ color: "white" }} />
        <Tab label="Verification and Bank Account" sx={{ color: "white" }} />
        <Tab label="Team" sx={{ color: "white" }} />
        {/* <Tab label="Analytics" sx={{ color: "white" }} />
        <Tab label="Social Media" sx={{ color: "white" }} />
        <Tab label="Wallet And Withdrawl" sx={{ color: "white" }} />
        <Tab label="Schedule Stream" sx={{ color: "white" }} />
        <Tab label="Privacy And Warnings" sx={{ color: "white" }} /> */}
      </Tabs>
      {renderTabContent()}
    </Box>
  );
}

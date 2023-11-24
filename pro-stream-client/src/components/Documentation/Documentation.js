import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Toolbar, Typography } from "@mui/material";
import JoinProstream from "./JoinProstream";
import BecomeStreamer from "./BecomeStreamer";
import RechargeEarn from "./RechargeEarn";
import TechnicalDocuments from "./TechnicalDocuments";
import VerificationAndBankAccount from "./VerificationAndBankAccount";

export default function Documentation() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return (
          <Box sx={{ color: "white" }}>
            <JoinProstream />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ color: "white" }}>
            <BecomeStreamer />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ color: "white" }}>
            <VerificationAndBankAccount />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ color: "white" }}>
            <RechargeEarn />
          </Box>
        );
      case 4:
        return (
          <Box sx={{ color: "white" }}>
            <TechnicalDocuments />
          </Box>
        );
      case 5:
        return <Box sx={{ color: "white" }}>{/* <UserWallet /> */}</Box>;
      case 6:
        return (
          <Box sx={{ color: "white" }}>{/* <WalletAndWithdrawl /> */}</Box>
        );
      case 7:
        return <Box sx={{ color: "white" }}>{/* <ScheduleStream /> */}</Box>;
      case 8:
        return (
          <Box sx={{ color: "white" }}>{/* <PrivacyAndWarnings /> */}</Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "black" }} padding={2}>
      <Toolbar />
      <Typography variant="h4" color="white">
        Documentation
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
        <Tab label="Join ProStream" sx={{ color: "white" }} />
        <Tab label="Become Streamer" sx={{ color: "white" }} />
        <Tab label="Verification And Bank Account" sx={{ color: "white" }} />
        <Tab label="Recharge & Earn" sx={{ color: "white" }} />
        <Tab label="Technical Documents" sx={{ color: "white" }} />
        {/* <Tab label="Social Media" sx={{ color: "white" }} />
        <Tab label="Withdrawl Money" sx={{ color: "white" }} />
        <Tab label="Schedule Stream" sx={{ color: "white" }} />
        <Tab label="Privacy And Warnings" sx={{ color: "white" }} /> */}
      </Tabs>
      {renderTabContent()}
    </Box>
  );
}

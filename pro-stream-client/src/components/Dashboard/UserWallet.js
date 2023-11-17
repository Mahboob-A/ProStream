import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { Box, Button, TextField, Typography } from "@mui/material";

const UserWallet = () => {
  const { access_token } = getToken();

  const [currentAmount, setCurrentAmount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/get/user-wallet-status/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCurrentAmount(response.data.available_amount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("amount", amount);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/finance/recharge/",
        { amount: amount },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("WalletAndWithdrawl", response.data);
        alert("Withdrawl money sent successfully!");
        window.location.href = response.data.redirect_url;
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "gray",
        width: "400px",
        height: "200px",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" marginBottom={2}>
        User Wallet
      </Typography>
      <Typography variant="h6" marginBottom={2}>
        Available Amount: {currentAmount}
      </Typography>
      <form action="" method="post" onSubmit={handleSubmit}>
        <TextField
          matginBottom={2}
          label="Amount"
          fullWidth
          type="number"
          name="amount"
          value={amount}
          onChange={handleChange}
          required
        />
        <Button color="primary" variant="contained" type="submit" marginTop={2}>
          Recharge now
        </Button>
      </form>
    </Box>
  );
};

export default UserWallet;

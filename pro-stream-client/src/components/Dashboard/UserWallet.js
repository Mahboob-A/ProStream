import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

const UserWallet = () => {
  const { access_token } = getToken();

  const [currentAmount, setCurrentAmount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://mahboob-alam.tech/dashboard/get/user-wallet-status/", {
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
        setError(error.response.data.message);
      });
  }, []);

  console.log("amount", amount);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://mahboob-alam.tech/finance/recharge/",
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

        window.location.href = response.data.redirect_url;
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
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
          Recharge Wallet
        </Typography>
        <Typography variant="h6" marginBottom={2}>
          Available Amount To Tip: {currentAmount ? currentAmount : 0}
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
            marginTop={2}
          >
            Recharge now
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserWallet;

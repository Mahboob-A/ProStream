import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const DOCUMENT_CHOICES = [
  ["VOTER", "VOTER CARD"],
  ["NID", "NID CARD"],
  ["AADHAR", "AADHAR CARD"],
  ["PASSPORT", "PASSPORT"],
  ["PAN", "PAN CARD"],
  ["PASSBOOK", "BANK PASSBOOK"],
];

const VerifyAndBankAcc = () => {
  const { access_token } = getToken();
  const [verificationInfo, setVerificationInfo] = React.useState({
    first_name: "",
    last_name: "",
    document_type: "",
    document: null,
  });
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/finance/verification/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("VerifyAndBankAcc", response.data.data);
        setVerificationInfo(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [access_token]);

  const handleChange = (e) => {
    setVerificationInfo({
      ...verificationInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (event) => {
    setVerificationInfo({
      ...verificationInfo,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch("http://127.0.0.1:8000/finance/verification/", verificationInfo, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        // setSocialLink(response.data.data);
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };
  const [bankAccount, setBankAccount] = React.useState({
    first_name: "",
    last_name: "",
    bank_name: "",
    account_no: "",
    ifsc_code: "",
    passbook_img: null,
  });
  console.log("bankAccount", bankAccount);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/finance/add-bank-details/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("VerifyAndBankAcc", response.data.data);
        setBankAccount(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [access_token]);

  const handleChange2 = (e) => {
    setBankAccount({
      ...bankAccount,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange2 = (event) => {
    setBankAccount({
      ...bankAccount,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    axios
      .patch(
        "http://127.0.0.1:8000/finance/add-bank-details/",
        verificationInfo,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        // setSocialLink(response.data.data);
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };
  return (
    <Box>
      <Box sx={{ backgroundColor: "red" }}>
        <Typography variant="h4">Verification </Typography>
        <Grid container>
          <Grid item xs={6} align="center" sx={{ backgroundColor: "red" }}>
            {/* set profile data  */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="First Name"
                    fullWidth
                    name="first_name"
                    value={verificationInfo.first_name || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    name="last_name"
                    value={verificationInfo.last_name || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label" color="secondary">
                      Document Type*
                    </InputLabel>
                    <Select
                      required
                      fullWidth
                      id="document_type"
                      label="Document Type"
                      value={verificationInfo.document_type || ""}
                      onChange={handleChange}
                      name="document_type"
                      color="secondary"
                    >
                      {DOCUMENT_CHOICES?.map(([value, label], index) => (
                        <MenuItem key={index} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Display Picture</Typography>
                  {verificationInfo.document ? (
                    <Avatar
                      src={`http://127.0.0.1:8000/${verificationInfo.document}`}
                      alt="Profile Picture"
                      sx={{ width: 150, height: 150 }}
                    />
                  ) : (
                    <Typography>No document available</Typography>
                  )}
                  <input
                    type="file"
                    name="document"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "yellow" }}>
        <Typography variant="h4">Bank Account</Typography>
        <Grid container>
          <Grid item xs={6} align="center">
            {/* set profile data  */}
            <form onSubmit={handleSubmit2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="First Name"
                    fullWidth
                    name="first_name"
                    value={bankAccount.first_name || ""}
                    onChange={handleChange2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    name="last_name"
                    value={bankAccount.last_name || ""}
                    onChange={handleChange2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bank Name"
                    fullWidth
                    name="bank_name"
                    value={bankAccount.bank_name || ""}
                    onChange={handleChange2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Account Number"
                    fullWidth
                    name="account_no"
                    value={bankAccount.account_no || ""}
                    onChange={handleChange2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="IFSC Code"
                    fullWidth
                    name="ifsc_code"
                    value={bankAccount.ifsc_code || ""}
                    onChange={handleChange2}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Display Picture</Typography>
                  {bankAccount.passbook_img ? (
                    <Avatar
                      src={`http://127.0.0.1:8000/${bankAccount.passbook_img}`}
                      alt="Passport Picture"
                      sx={{ width: 150, height: 150 }}
                    />
                  ) : (
                    <Typography>No document available</Typography>
                  )}
                  <input
                    type="file"
                    name="passbook_img"
                    accept="image/*"
                    onChange={handleFileChange2}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VerifyAndBankAcc;

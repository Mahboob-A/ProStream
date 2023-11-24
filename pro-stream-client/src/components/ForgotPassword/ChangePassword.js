import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signinbg from "../../Images/signinbg.jpg";
import { Toolbar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";

const defaultTheme = createTheme();

const ChangePassword = ({ encoded_uuid, password_token }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://mahboob-alam.tech/auth/reset-password/",
        {
          email,
        }
      );
      // console.log("Login successful", response.data);

      if (response.data.status == "success") {
        alert("Email sent");
        // navigate(`/reset-password/${encoded_uuid}/${password_token}`);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${signinbg})`,
          backgroundRepeat: `no-repeat`,
          opacity: ".9",
          height: "100%",
          width: "100%",
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ padding: 4 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#cccccc",
              padding: 3,
              color: "black",
              borderRadius: "10px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" textAlign="center">
              Change Your Password <br /> using Email
            </Typography>
            <Typography variant="body">Please give your valid email</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Send Verification Email
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default ChangePassword;

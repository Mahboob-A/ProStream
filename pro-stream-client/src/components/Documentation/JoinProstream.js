import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const JoinProstream = () => {
  return (
    <Box padding={2}>
      {/* <Typography variant="h4" color="white" textAlign="center">
        Join ProStream
      </Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" color="white" textAlign="center">
            User Sign Up
          </Typography>
          <Typography variant="h6" color="white">
            Overview:
          </Typography>
          <Typography variant="body2" color="white">
            Welcome to ProStream. This documentation provides a step-by-step
            guide for a user signing up and creating a new account in ProStream.{" "}
            <br /> Before you begin, you ensure that have a unique username, a
            valid email address, and a strong password.{" "}
          </Typography>
          <br />
          <Typography variant="h6" color="white">
            Table of contents:
          </Typography>
          <ul>
            <li>Username</li>
            <li>Email</li>
            <li>Password</li>
          </ul>
          <br />
          <Typography variant="h6" color="white">
            Username:
          </Typography>
          <Typography variant="body2" color="white">
            At first, you need to choose a unique username. Follow these
            guidelines:
          </Typography>
          <ul>
            <li>Your username must be unique.</li>
            <li>
              It can contain letters, numbers, Special characters and
              underscores.
            </li>
            <li>The maximum length is 25.</li>
            <li>The demo username is “PRO_STREAM@1234” </li>
          </ul>
          <Typography variant="h6" color="white">
            Email:
          </Typography>
          <Typography variant="body2" color="white">
            Provide a valid email address for account verification and
            communication purposes. Because any important mail will be sent to
            you mail. Follow these guidelines:
          </Typography>
          <ul>
            <li>The email address must be unique.</li>
            <li>Use a valid and active email address.</li>
            <li>
              Ensure the email address is not associated with another account.
            </li>
          </ul>
          <Typography variant="h6" color="white">
            Password:
          </Typography>
          <Typography variant="body2" color="white">
            There are many rules when you enter the password. We provide that
            rule to strengthen your account password. Follow these guidelines:
          </Typography>
          <ul>
            <li>
              The password must not be less than 5 and not greater than 15.
            </li>
            <li>
              The password must have at least one special character (@#!$&*).
            </li>
            <li>
              Do not use three or more consecutive characters that are the same.
              Like this “arrron”.{" "}
            </li>
            <li>
              Ensure your password includes a mix of characters and numerics.{" "}
            </li>
          </ul>
          <Typography variant="h6" color="white">
            Valid Passwords:
          </Typography>
          <ul>
            <li>StrongP@ssword123</li>
            <li>SecurePass123!</li>
          </ul>
          <Typography variant="h6" color="white">
            Invalid Passwords:
          </Typography>
          <ul>
            <li>WeakPassaaa (three consecutive 'a's)</li>
            <li>
              AlphabeticOnly (no numeric characters and special characters)
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" color="white" textAlign="center">
            User Sign In
          </Typography>
          <Typography variant="h6" color="white">
            Overview:
          </Typography>
          <Typography variant="body2" color="white">
            In the beginning, you have to create an account in ProStream. This
            documentation guides you through the process of signing in to your
            account. You have two options for signing in: using your username or
            email with a password or opting for a more secure login method with
            a one-time password (OTP) sent to your valid email.
          </Typography>
          <Typography variant="h6" color="white">
            Table of Contents:
          </Typography>
          <ul>
            <li>Sign In with Username/Email and Password</li>
            <li>Sign In with OTP</li>
          </ul>
          <Typography variant="h6" color="white">
            1. Sign In with Username/Email and Password:
          </Typography>
          <ul>
            <li>
              Enter your correct username or email, you can use anyone from this
              for sign-in.
            </li>
            <li>Enter your correct password in the password field.</li>
          </ul>
          <Typography variant="h6" color="white">
            2. Sign In with OTP:
          </Typography>
          <ul>
            <li>
              Enter the “Sign in with OTP” button. Then you will go to a page
              where you need to write the correct OTP.
            </li>
            <li>
              If your email is valid mail will be sent in your mail. Then enter
              the correct OTP and you can successfully sign in ProStream.
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinProstream;

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const VerificationAndBankAccount = () => {
  return (
    <Box>
      <Typography variant="h4" color="white" textAlign="center">
        verification
      </Typography>
      <Typography variant="h6" color="white">
        Overview:{" "}
      </Typography>
      <Typography variant="body" color="white">
        At first, the user needs to become a streamer. Now streamer can’t
        receive any tips from users until he is not verified and doesn’t add
        bank account details. Follow these guidelines for verification:
      </Typography>
      <br />
      <br />
      <Typography variant="body" color="white">
        There the streamer gets a form where the streamer needs to add his
        documents{" "}
        <b>
          like VOTER CARD, NID CARD, AADHAR CARD, PASSPORT, PAN CARD, BANK
          PASSBOOK etc.
        </b>{" "}
        Also, there needs first name and last name. If your first name and last
        name cannot match with the following document that you added then your
        verification is not to be approved. Fill up the form carefully unless
        your verification is not approved. If your application is successfully
        sent ProStream team will send you a mail.
      </Typography>
      <Typography variant="h4" color="white" textAlign="center">
        Add Bank Account details:
      </Typography>
      <Typography variant="h6" color="white">
        Overview:{" "}
      </Typography>
      <Typography variant="body" color="white">
        Now if the streamer is verified then he/she can add bank account
        details. If the streamer can successfully add his bank account details
        then he/she can receive tips from users. Follow these guidelines to add
        bank account details:
      </Typography>
      <Typography variant="body" color="white">
        In this section, the streamer will get a form which the streamer needs
        to fill up. There the streamer can add bank account details and please
        fill up the form carefully because everything will be checked. If your
        application is successfully sent ProStream team will send you a mail.
        For security issues, our ProStream team added a rule that when you
        update bank account details your verification will be under process.
        Then our ProStream team again check your verification. If you are valid
        then again will be verified. This rule was added because if a hacker
        hacked your ID and hacker added bank account details to withdraw money
        then he can easily withdraw money. That’s why we added this rule.{" "}
      </Typography>
    </Box>
  );
};

export default VerificationAndBankAccount;

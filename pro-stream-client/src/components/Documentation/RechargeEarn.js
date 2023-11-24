import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const RechargeEarn = () => {
  return (
    <Box>
      <Typography variant="h4" color="white" textAlign="center">
        Withdraw Money (For Streamer)
      </Typography>
      <Typography variant="h6" color="white">
        Overview:{" "}
      </Typography>
      <Typography variant="body" color="white">
        The streamer receives tips from users during the stream and the streamer
        can withdraw this money. This section is amazing for streamers because
        they can earn money from ProStream. Only streamers have this wallet and
        can withdraw money from his/her streamer wallet. Follow these
        guidelines:
      </Typography>
      <Typography variant="h6" color="white">
        Rules:{" "}
      </Typography>
      <Typography variant="body" color="white">
        <ol>
          <li>Streamers need to be verified first.</li>
          <li>
            Then add the bank account details and streamer verification under
            process.
          </li>
          <li>
            If the streamer is verified and adds the bank account details then
            the streamer can get tips from users and can earn money.
          </li>
        </ol>
      </Typography>
      <Typography variant="h6" color="white">
        Withdraw Money
      </Typography>
      <Typography variant="body" color="white">
        If the streamer is verified and successfully added bank account details
        then the streamer can be ready to withdraw money. The streamer now
        enters amounts for withdrawal and the withdrawn money will be
        transferred to his/her bank account within the next 72 hours. If the
        streamer withdraws money successfully he will get an email from the
        ProStream team. If you have any questions or concerns regarding this
        withdrawal or if you encounter any issues, please do not hesitate to
        contact our support team. Our dedicated team is here to assist you and
        ensure that your experience with ProStream is smooth and hassle-free
      </Typography>
      <br />
      <br />
      <Typography variant="h4" color="white" textAlign="center">
        Recharge User wallet
      </Typography>
      <Typography variant="h6" color="white">
        Overview:{" "}
      </Typography>
      <Typography variant="body" color="white">
        User can recharge their wallet and tip to a verified streamer during the
        stream. Recharging your wallet on ProStream is a seamless process that
        allows you to add funds securely to your account. We use the SSL Commerz
        payment gateway for a safe and reliable transaction experience. Follow
        the steps below to recharge your wallet successfully.
      </Typography>
      <Typography variant="h6" color="white">
        Wallet Recharge:
      </Typography>
      <Typography variant="body" color="white">
        Wallet recharge section located at user dashboard. The user can see
        his/her wallet status and there is a form where the user enters the
        amount for recharge. Then automatically redirect to the{" "}
        <b>“SSL Commerze”</b> page the user can select any bank or mobile bank
        like Bkash, Brac Bank etc. If the transaction is successful, the user
        will get an email from our ProStream where the user can see the current
        amount of his/her wallet the current recharged money and the transaction
        date.
      </Typography>
    </Box>
  );
};

export default RechargeEarn;

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Box } from "@mui/material";
import img1 from "./Images/stream2.png";

const Footer = () => {
  return (
    <footer>
      {/* <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="text">
              Pellentesque suscipit pellentesque luctus. Nulla vel tellus nec
              risus tempus feugiat. Donec nibh orci, sollicitudin sit amet
              gravida at, varius sit amet sem.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Information</Typography>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Press</li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Category</Typography>
            <ul>
              <li>Videos</li>
              <li>Gaming</li>
              <li>Travel</li>
              <li>Music</li>
              <li>Sports</li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Latest Post</Typography>
            <Box>
              <Container>
                <Row>
                  <Col>
                    <img style={{ width: "100%" }} src={img1} alt="" />
                  </Col>
                  <Col>
                    <Typography variant="text">Most funny sports moments you have ever seen</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <img style={{ width: "100%" }} src={img1} alt="" />
                  </Col>
                  <Col>
                    <Typography variant="text">How to Create Simple and Effective Product Videos</Typography>
                  </Col>
                </Row>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Container> */}
    </footer>
  );
};

export default Footer;

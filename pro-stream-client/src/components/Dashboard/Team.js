import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Team = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#DFC5FE",
        padding: 3,
        margin: 2,
        borderRadius: 5,
      }}
    >
      <Typography variant="h2" sx={{ color: "white" }}>
        Team
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Team Name
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Member 1: atiq
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Member 2: mahboob
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Member 3: saimum
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Member 4: firoz
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Create a team
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="team"
            label="Enter your team name"
            name="team"
            color="secondary"
            // value={credential}
            // onChange={(e) => setCredential(e.target.value)}
          />

          <Button variant="contained" color="secondary">
            Create Team
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Add Member
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name1"
            label="Enter Member Username or Email"
            name="member1"
            color="secondary"
            // value={credential}
            // onChange={(e) => setCredential(e.target.value)}
          />

          <Button variant="contained" color="secondary">
            submit
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Remove Member
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name1"
            label="Enter Member Username or Email"
            name="member1"
            color="secondary"
            // value={credential}
            // onChange={(e) => setCredential(e.target.value)}
          />

          <Button variant="contained" color="secondary">
            submit
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Change Admin
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="admin"
            label="New Admin Name"
            name="admin"
            color="secondary"
            // value={credential}
            // onChange={(e) => setCredential(e.target.value)}
          />
          <Button variant="contained" color="secondary">
            Change Admin
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "white" }}>
            Leave from Team
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newAdmin"
            label="New Admin Name"
            name="newadmin"
            color="secondary"
            // value={credential}
            // onChange={(e) => setCredential(e.target.value)}
          />
          <Button variant="contained" color="secondary">
            Leave
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;

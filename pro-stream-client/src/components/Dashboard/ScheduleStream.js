import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getToken } from "../../services/LocalStorageService";
import axios from "axios";
import { MuiPickersUtilsProvider } from "@mui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const ScheduleStream = () => {
  const { access_token } = getToken();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [schedule, setSchedule] = React.useState({
    stream_title: "",
    scheduled_time: "",
  });

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/dashboard/live-stream-schedule-crud/", {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("VerifyAndBankAcc", response.data.data);
  //       setVerificationInfo(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [access_token]);

  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/dashboard/live-stream-schedule-crud/",
        schedule,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("schedule data updated successfully:", response.data);
        // setSocialLink(response.data.data);
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };

  return (
    <Box sx={{ backgroundColor: "red" }}>
      <div>Schedule Stream</div>;
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Stream Title"
              fullWidth
              name="stream_title"
              value={schedule.stream_title || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Scheduled Time"
              fullWidth
              name="scheduled_time"
              value={schedule.scheduled_time || ""}
              onChange={handleChange}
            />
          </Grid>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          {/* <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            renderInput={(params) => <TextField {...params} />}
          /> */}
          {/* </MuiPickersUtilsProvider> */}
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
          <TextField
            fullWidth
            label="Selected Date"
            value={selectedDate.toISOString().split("T")[0]} // Format the date as per your requirement
            variant="standard"
            readOnly
          />
          {/* </LocalizationProvider> */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ScheduleStream;

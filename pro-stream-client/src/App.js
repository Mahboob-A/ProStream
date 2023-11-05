import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Stream from "./components/Stream/Stream";
import Home from "./components/Home/Home";
import AllStream from "./components/Home/AllStream";
import ValidationPage from "./components/ForgotPassword/ValidationPage";
import LogInOTP from "./components/SignIn/LogInOTP";
import ConfirmOTP from "./components/SignIn/ConfirmOTP";
import ChangePassword from "./components/ForgotPassword/ChangePassword";
import ConfirmChangePassword from "./components/ForgotPassword/ConfirmChangePassword";
import { useSelector } from "react-redux";
import NavBar from "./components/Common/NavBar";
import Footer from "./components/Common/Footer";
import SingleStream from "./components/Stream/SingleStream";
import StreamForm from "./components/Stream/StreamForm";
import Core from "./components/VideoStream/VideoCore";
import VideoHome from "./components/VideoStream/VideoHome";
import VideoStream from "./components/VideoStream/VideoStream";
import BecomeStreamForm from "./components/Home/BecomeStreamForm";
import Profile from "./components/Dashboard/Profile";

function App() {
  // access access_token from redux state
  const { access_token } = useSelector((state) => state.auth);
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path=""
            // element={access_token ? <Home /> : <Navigate to="/signin" />} // home page private route
            element={<Home />}
          >
            <Route path="/" element={<AllStream />} />
            <Route path="video" element={<SingleStream />}>
              <Route path=":id" element={<SingleStream />} />
            </Route>
          </Route>
          <Route path="stream-form" element={<StreamForm />} />
          <Route path="become-stream-form" element={<BecomeStreamForm />} />
          <Route
            path="signup"
            element={!access_token ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="signin"
            element={!access_token ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="change-password"
            element={
              access_token ? <ChangePassword /> : <Navigate to="/signin" />
            }
          />
          {/* <Route
            path="reset-password/:encoded_uuid/:password_token"
            element={<ConfirmChangePassword />}
          /> */}
          <Route
            path="forgot-password"
            element={!access_token ? <ForgotPassword /> : <Navigate to="/" />}
          />
          <Route
            path="otp-validation"
            element={!access_token ? <ValidationPage /> : <Navigate to="/" />}
          />
          <Route
            path="login-with-otp"
            element={!access_token ? <LogInOTP /> : <Navigate to="/" />}
          />
          <Route
            path="login-with-otp-email-confirmation"
            element={!access_token ? <ConfirmOTP /> : <Navigate to="/" />}
          />
          {/* video stream check  */}
          {/* <Route path="core-check" element={<Core />}></Route> */}
          <Route path="home-check" element={<VideoHome />}></Route>
          <Route path="stream-check" element={<VideoStream />}></Route>

          {/* dashboard all routes  */}
          <Route path="dashboard/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

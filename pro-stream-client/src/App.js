import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import AllStream from "./components/Home/AllStream";
import ValidationPage from "./components/ForgotPassword/ValidationPage";
import LogInOTP from "./components/SignIn/LogInOTP";
import ConfirmOTP from "./components/SignIn/ConfirmOTP";
import ChangePassword from "./components/ForgotPassword/ChangePassword";
import ConfirmChangePassword from "./components/ForgotPassword/ConfirmChangePassword";
import { useSelector } from "react-redux";
import NavBar from "./components/Common/NavBar";
import SingleStream from "./components/Stream/SingleStream";
import StreamForm from "./components/Stream/StreamForm";
import BecomeStreamForm from "./components/Home/BecomeStreamForm";
import Profile from "./components/Dashboard/Profile";
import AgoraChat from "./components/AgoraChat/AgoraChat";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorPage from "./components/Common/ErrorPage";

function App() {
  // access access_token from redux state
  const { access_token } = useSelector((state) => state.auth);

  return (
    <div className="App" style={{ backgroundColor: "#0d0d0d" }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path=""
            // element={access_token ? <Home /> : <Navigate to="/signin" />} // home page private route
            element={<Home />}
          >
            <Route path="/" element={<AllStream />} />
            <Route path="video" element={<SingleStream />} />
          </Route>
          <Route path="stream-form" element={<StreamForm />} />
          <Route path="become-stream-form" element={<BecomeStreamForm />} />

          {/* signin signup related route  */}
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

          {/* dashboard all routes  */}
          {/* <Route path="dashboard/profile" element={<Profile />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* agora chat  */}
          <Route path="chat" element={<AgoraChat />} />

          {/* error page  */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

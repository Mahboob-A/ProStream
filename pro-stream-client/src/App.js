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
function App() {
  // access access_token from redux state
  const { access_token } = useSelector((state) => state.auth);
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={access_token ? <Home /> : <Navigate to="/signin" />}
          >
            <Route path="/" element={<AllStream />} />
            <Route path="video" element={<Stream />} />
          </Route>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

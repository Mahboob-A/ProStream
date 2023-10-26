import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Stream from "./components/Stream/Stream";
import Home from "./components/Home/Home";
import AllStream from "./components/Home/AllStream";
import ValidationPage from "./components/ForgotPassword/ValidationPage";
import LogInOTP from "./components/SignIn/LogInOTP";
import ConfirmOTP from "./components/SignIn/ConfirmOTP";
import ChangePassword from "./components/ForgotPassword/ChangePassword";
import ConfirmChangePassword from "./components/ForgotPassword/ConfirmChangePassword";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}>
            <Route path="/" element={<AllStream />} />
            <Route path="video" element={<Stream />} />
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="change-password" element={<ChangePassword />} />
          {/* <Route
            path="reset-password/:encoded_uuid/:password_token"
            element={<ConfirmChangePassword />}
          /> */}
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="otp-validation" element={<ValidationPage />} />
          <Route path="login-with-otp" element={<LogInOTP />} />
          <Route
            path="login-with-otp-email-confirmation"
            element={<ConfirmOTP />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

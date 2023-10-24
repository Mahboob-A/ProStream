import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

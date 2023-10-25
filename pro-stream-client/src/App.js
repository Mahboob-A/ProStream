import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Stream from "./components/Stream/Stream";
import Home from "./components/Home/Home";
import AllStream from "./components/Home/AllStream";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}>
            <Route path="/" element={<AllStream />} />
            <Route path="video" element={<Stream />} />
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

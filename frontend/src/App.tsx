import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sign_up_page from "./components/Sign_up_page";
import Login_Page from "./components/Login_page";
import Home_Page from "./components/Home_Page";
import Footer from "./components/Footer";
import { useState } from "react";

export interface UserInfo {
  name: string;
  lastname: string;
  isLoggedIn: boolean;
}

function App() {
  const navigate = useNavigate();
  const [userInfo, setStatus] = useState<UserInfo>({
    name: "",
    lastname: "",
    isLoggedIn: false
  });

  const handleLogout = () => {
    setStatus({ ...userInfo, name: "", lastname: "", isLoggedIn: false }); // Delete user info
  }

  const handleLogin = (name: string, lastname: string) => {
    setStatus({ ...userInfo, name: name, lastname: lastname, isLoggedIn: true }); // Set user info
  }

  return (
    < NextUIProvider navigate={navigate} >
      <Navbar userInfo={userInfo} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home_Page userInfo={userInfo} />} />
        <Route path="/login" element={<Login_Page handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Sign_up_page />} />
      </Routes>
      <Footer />
    </NextUIProvider >
  )
}

export default App

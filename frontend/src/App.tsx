import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sign_up_page from "./components/Sign_up_page";
import Login_Page from "./components/Login_page";
import Home_Page from "./components/Home_Page";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    < NextUIProvider navigate={navigate} >
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/login" element={<Login_Page />} />
        <Route path="/signup" element={<Sign_up_page />} />
      </Routes>
      <Footer />
    </NextUIProvider >
  )
}

export default App

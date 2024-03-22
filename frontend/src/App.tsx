import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sign_up_page from "./components/Sign_up_page";
import Login_Page from "./components/Login_page";
import Home_Page from "./components/Home_Page";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();

  return (
    < NextUIProvider navigate={navigate} >
      <Navbar />
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

import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sign_in_page from "./components/Sign_in_page";
import Login_Page from "./components/Login_page";
import Home_Page from "./components/Home_Page";

function App() {
  const navigate = useNavigate();

  return (
    < NextUIProvider navigate={navigate} >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/login" element={<Login_Page />} />
        <Route path="/signin" element={<Sign_in_page />} />
      </Routes>
    </NextUIProvider >
  )
}

export default App

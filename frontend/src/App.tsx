import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sign_in_page from "./components/Sign_in_page";
import Login_Page from "./components/Login_page";

function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-600 h-screen">

      < NextUIProvider navigate={navigate} >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login_Page />} />
          <Route path="/signin" element={<Sign_in_page />} />
        </Routes>
      </NextUIProvider >
    </div>
  )
}

export default App

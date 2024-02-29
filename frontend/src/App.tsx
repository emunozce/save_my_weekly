import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Sign_In_Page from "./components/Sign_In_Page";
import Log_In_Page from "./components/Log_In_Page";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Navbar />
      <Routes>
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<Log_In_Page />} />
        <Route path="/signin" element={<Sign_In_Page />} />
      </Routes>
    </NextUIProvider>
  )
}

export default App

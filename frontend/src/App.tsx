import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Navbar />
      <Routes>
        <Route path="/loader" element={<Loader />} />
        {/* <Route path="/signin" element={<HomePage />} /> */}
      </Routes>
    </NextUIProvider>
  )
}

export default App

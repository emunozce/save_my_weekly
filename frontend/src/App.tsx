// import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <Navbar />
      {/* <Loader /> */}
    </NextUIProvider>
  )
}

export default App

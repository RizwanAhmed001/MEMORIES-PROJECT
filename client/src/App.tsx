import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Memory from "./pages/Memory";
import Home from "./pages/Home";
import SingleMemory from "./pages/SingleMemory";
import Login from "./pages/login";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Header />
      <div className="w-full py-4 px-20 bg-linear-to-br from-red-200 to-purple-100 min-h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<Memory />} />
          <Route path={`/memory/:id`} element={<SingleMemory />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

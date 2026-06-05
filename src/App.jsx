import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Analyze from "./pages/Analyze";
import Stylist from "./pages/Stylist";
import Wardrobe from "./pages/Wardrobe";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./components/Chatbot";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/dashboard" element={<Dashboard />} />
<Route path="/analyze" element={<Analyze />} />
<Route path="/stylist" element={<Stylist />} />
<Route path="/wardrobe" element={<Wardrobe />} />
<Route path="/chatbot" element={<Chatbot />} />

    </Routes>
  );
}

export default App;
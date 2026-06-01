import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Analyze from "./components/Analyze";
import Stylist from "./components/Stylist";
import Wardrobe from "./components/Wardrobe";
import Dashboard from "./components/Dashboard";
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

    </Routes>
  );
}

export default App;
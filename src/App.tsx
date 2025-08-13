import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Boards from "./components/pages/Boards";
import Dashboard from "./components/pages/Dashboard";
import Reports from "./components/pages/Reports";
import Settings from "./components/pages/Settings";
import Notifications from "./components/pages/Notifications";
import Logout from "./components/pages/Logout";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        {/* Default route */}
        <Route path="*" element={<Boards />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;

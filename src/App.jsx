import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import RemindersPage from "./pages/RemindersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="scan" element={<ScanPage />} />
        <Route path="reminders" element={<RemindersPage />} />
      </Route>
    </Routes>
  );
}

export default App;

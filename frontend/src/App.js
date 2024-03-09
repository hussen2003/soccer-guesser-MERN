import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.js';
import LandingPage from './pages/LandingPage';
import DailyPage from './pages/DailyPage';
import Leaderboard from './pages/Leaderboard';
import AboutPage from './pages/AboutPage.js';
import SignUpPage from './pages/SignUpPage.js';
import UnlimitedMode from './pages/UnlimitedMode.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" index element={<LoginPage />} />
          <Route path = "/SignUpPage" index element={<SignUpPage />} />
          <Route path = "/LandingPage" index element={<LandingPage />} />
          <Route path = "/DailyPage" index element = {<DailyPage />} />
          <Route path = "/Leaderboard" index element = {<Leaderboard />} />
          <Route path = "/AboutPage" index element = {<AboutPage />} />
          <Route path = "/UnlimitedMode" index element = {<UnlimitedMode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

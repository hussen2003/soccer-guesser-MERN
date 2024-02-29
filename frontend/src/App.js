import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.js';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" index element={<LoginPage />} />
          <Route path = "/LandingPage" index element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

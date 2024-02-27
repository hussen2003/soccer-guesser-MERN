import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <About />
    </div>
  );
}

export default App;

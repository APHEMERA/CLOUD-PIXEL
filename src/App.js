import { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { useState } from "react";
import Current from "./pages/Current";
function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  return (
    <div>
      <AuthContext.Provider value={{ value: [isClicked, setIsClicked], value2: [isBtnClicked, setIsBtnClicked] }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/current" element={<Current />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

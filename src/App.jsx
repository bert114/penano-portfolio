import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Project from "./components/Project";
import NoPage from "./components/NoPage";
import Main from "./pages/Main";
function App() {
  return (
    <BrowserRouter basename="/bertpenano">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

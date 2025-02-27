import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import NotFound from "@/pages/NotFound/NotFound";
import parseOpenApi from "./utils/parseOpenApi";

function App() {

  parseOpenApi();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

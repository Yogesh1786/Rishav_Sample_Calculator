import { Routes, Route } from "react-router-dom";
import Sample_Test_1 from "./components/Sample_Test_1";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sample_Test_1 />} />
      </Routes>
    </>
  );
}

export default App;

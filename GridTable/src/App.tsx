import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminTable from "./components/Table";
import Job from "./components/Job";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gridTable" element={<AdminTable />}></Route>
          <Route path="/job" element={<Job />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

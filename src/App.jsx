import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashBoard />}>
              <Route index element={<Home/>} />
              <Route path="employee-list" element={<EmployeeList />} />
              <Route path="create-employee" element={<CreateEmployee />} />
              <Route
                path="employee-list/update-employee/:id"
                element={<CreateEmployee />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

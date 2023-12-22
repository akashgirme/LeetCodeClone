import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProblemList from "./Components/ProblemList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Solution from "./Components/Solution";
import Notfound from "./Components/Notfound";
import AdminPanel from "./admin/AdminPanel";
import Problem from "./admin/Problem";
import Users from "./admin/Users";
import { AuthProvider } from "./Components/AuthContext";
import AddProblemWithTestCasesForm from "./admin/ProblemWithTestcases";
import TestCase from "./admin/Testcase";
import AdminLogin from "./admin/AdminLogin";
import DeleteAdmin from "./admin/DeleteAdmin";
import AddSolution from "./admin/AddSolution";
import CodeExecution from "./Components/CodeExecution";
import "@mui/material/styles";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/problems/:id" element={<Solution />} />
          <Route path="/api/admin" element={<AdminPanel />} />
          <Route path="/admin/problem" element={<Problem />} />
          <Route path="/admin/user" element={<Users />} />
          <Route
            path="/admin/problemWithTestCases"
            element={<AddProblemWithTestCasesForm />}
          />
          <Route path="/admin/testcases" element={<TestCase />} />
          <Route path="/api/admin/login" element={<AdminLogin />} />
          <Route path="/admin/deleteAdmin" element={<DeleteAdmin />} />
          <Route path="/admin/addsolution" element={<AddSolution />} />
          <Route path="/code/test" element={<CodeExecution />} />

          {/* Here If we click on Problem Link ->> Link set path as "/problemList/id" but we dont
              want only description page of that problem hence whenever path become "/problemList/id"
              we routed to solution page and then solution page create route for description according
              to id of problem 
            */}

          <Route path="*" element={<Notfound />} />
          {/* If no path match for any Link tag "*" we route to Notfound Component */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

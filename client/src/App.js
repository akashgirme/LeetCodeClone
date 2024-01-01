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
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/problem" element={<Problem />} />
          <Route path="/admin/user" element={<Users />} />
          <Route
            path="/admin/problemWithTestCases"
            element={<AddProblemWithTestCasesForm />}
          />
          <Route path="/admin/testcases" element={<TestCase />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/addsolution" element={<AddSolution />} />
          <Route path="/code/test" element={<CodeExecution />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

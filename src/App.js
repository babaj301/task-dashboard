import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TodoApp from "./pages/TodoApp";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} />
      <Route path="/todoApp" element={<TodoApp />} />
    </Routes>
  );
}

export default App;

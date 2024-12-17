import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;

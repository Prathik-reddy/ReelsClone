import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from "./Context/AuthContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

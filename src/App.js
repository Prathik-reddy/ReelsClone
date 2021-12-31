import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from "./Context/AuthContext";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Feed from './components/Feed';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Feed/>} />
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

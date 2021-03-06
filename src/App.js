import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from "./Context/AuthContext";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Profile/:id" element={<Profile />}/>
          <Route  path="/" element={<PrivateRoute />}>
            <Route  path="/" element={<Feed />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

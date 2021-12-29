import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <SignUp/>
    </Router>
  );
}

export default App;

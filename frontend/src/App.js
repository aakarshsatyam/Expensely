import './App.css';
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/login/Signup';
import Login from './components/login/Login';
import Homepage from './components/homepage/Homepage';
import Category from './components/category/Category';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
        <Route exact path='/homepage' element={< Homepage />}></Route>
        <Route exact path='/homepage/category' element={< Category />}></Route>
      </Routes>
    </div>
  );
}

export default App;

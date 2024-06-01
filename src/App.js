import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  console.log("Backend URL - "+process.env.REACT_APP_BACKEND_URL);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/> } ></Route>
          <Route path="/login" element={<Login/>} ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/movielist" element={<MovieList/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
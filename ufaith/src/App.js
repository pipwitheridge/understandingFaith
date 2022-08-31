import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Navbar1 from './Components/Navbar/Navbar';
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Bookshelf from "./Components/Bookshelf/Bookshelf";
import { React, Container } from "react-bootstrap";
import Profile from "./Components/Profile/Profile";
import Courses from "./Components/Courses/Courses";

function App() {
  return (

    <div style={{"height" : "100%", "background": "rgb(248, 249, 250)"}}>
    <Router>
      <Navbar1/> 
        <Container className="col-sm-12">
        <Routes>
          <Route path="/home" element={<Home />}>
          </Route>
          <Route path="/signup" element={<SignUp />}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/bookshelf" element={<Bookshelf />}>
          </Route>
          <Route path="/courses" element={<Courses />}>
          </Route>
          <Route path="/profile" element={<Profile />}>
          </Route>
        </Routes>
        </Container>
    </Router>
    </div>

  
  );
}

export default App;

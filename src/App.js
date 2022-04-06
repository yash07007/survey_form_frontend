import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navbar.component";
import Login from "./components/login.component";
import Quiz from "./components/quiz.component";
import Profile from "./components/profile.component";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/quiz" element={<Quiz/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>
    );
}

export default App;

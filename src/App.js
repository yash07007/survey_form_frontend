import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navbar.component";
import Survey from "./components/survey.component";
import Admin from "./components/admin.component";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Survey />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navbar.component";
import Survey from "./components/survey.component";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Survey/>} />
            </Routes>
        </Router>
    );
}

export default App;

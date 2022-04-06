import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Navbar
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/">
                                Login
                            </Link>
                            <Link className="nav-link" to="/quiz">
                                Quiz
                            </Link>
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

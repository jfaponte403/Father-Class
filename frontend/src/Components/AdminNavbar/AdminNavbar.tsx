import {Link, NavLink} from "react-router-dom";

const AdminNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/home-admin" className="navbar-brand">
                    Father Class
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink to="/students-admin" className="nav-link">
                                Students
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/teachers-admin" className="nav-link">
                                Teachers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/parents-admin" className="nav-link">
                                Parents
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/' className="btn btn-outline-danger">
                                Log out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar;
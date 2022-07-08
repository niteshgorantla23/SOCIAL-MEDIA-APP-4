import {Link, Outlet} from "react-router-dom";
import UserContext from "../../context/user/userContext.js";
import {useContext, Fragment} from 'react';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const {user, updateUser} = useContext(UserContext);

    const authenticated = (
        <Fragment>
            <i>{user.username}'s</i>
        </Fragment>
    );

    const guest = (
        <Fragment>
            <h2></h2>
        </Fragment>
    );

    const Logout = (e) => {
        updateUser("authenticated", false);
        navigate("/login");
    } 

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><strong>MySocialApp</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {user.authenticated?
                            <>
                            <li className="nav-item me-5">
                                <Link className="nav-link" to="profile">{authenticated} Profile</Link>
                            </li>
                            <li className="nav-item me-5">
                                <button onClick={Logout} className="btn btn-dark">Logout</button>
                            </li>
                            </>
                            :
                            <>
                            <li className="nav-item me-5">
                          
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item me-5">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;
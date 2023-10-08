import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { logout } from "../services/AuthService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Nav = () => {
  const { loggedIn, logOutUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    confirmAlert({
      title: "Log Out",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            logout().then(({ data }) => {
              logOutUser(data);
              localStorage.removeItem("access_token");
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              navigate("/login");
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
          <Link className="navbar-brand" to="/">Galleries</Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">Create New Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-galleries">My Galleries</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" type="button" onClick={() => handleLogOut()}>Log Out</button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">{user?.first_name} {user?.last_name}</Link>
                </li> 
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
   )
};

export default Nav;








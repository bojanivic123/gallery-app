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
    <div>
      <nav className="nav affix">
        <div className="container">
          <div className="logo">
            <Link to="/">Galleries</Link>
          </div>
          <div className="user_div">
            {loggedIn ? (
              <ul>
                <li className="user">
                  <Link to="#">
                    {user?.first_name} {user?.last_name}
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
          <div id="mainListDiv" className="main_list">
            <ul className="navlinks">
              {loggedIn ? (
                <>
                  <li>
                    <Link to="/create">Create New Gallery</Link>
                  </li>
                  <li>
                    <Link to="/my-galleries">My Galleries</Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline-danger"
                      type="submit"
                      onClick={() => handleLogOut()}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/"></Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;




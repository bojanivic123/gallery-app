import { useContext, useState } from "react";
import { register } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const AppRegister = () => {
  const navigate = useNavigate();
  const { logInUser } = useContext(UserContext);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAccepted === true) {
      const { password, password_confirmation } = user;

      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (!/\d/.test(password)) {
        setError("Password must contain at least 1 number.");
        return;
      }

      if (password !== password_confirmation) {
        setError("Passwords do not match.");
        return;
      }

      register(
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.password_confirmation
      )
        .then(({ data }) => {
          logInUser(data.user);
          localStorage.setItem("access_token", data.authorisation.token);
          localStorage.setItem("email", user.email);
          localStorage.setItem("password", user.password);
          setError("");
          setUser({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
          navigate("/");
        })
        .catch(() => {
          setError("Email already exists. Please choose another email.");
        });
    }
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleChecked = () => {
    setIsAccepted(!isAccepted); 
  };

  return (
    <div className="container-fluid py-5 bg-primary"> 
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card p-5" style={{ borderRadius: "1rem", opacity: "90%" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <h1 className="fw-bold mb-4">Register</h1> 

                    <div className="mb-4">
                      <input type="text" className="form-control" placeholder="First name" name="first_name" onChange={handelInputChange} value={user.first_name}required/>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        name="last_name"
                        onChange={handelInputChange}
                        value={user.last_name}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        name="email"
                        onChange={handelInputChange}
                        value={user.email}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handelInputChange}
                        value={user.password}
                        placeholder="Password"
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password confirmation"
                        name="password_confirmation"
                        onChange={handelInputChange}
                        value={user.password_confirmation}
                      />
                    </div>

                    <div className="form-check mb-4">
                      <input
                        type="checkbox"
                        checked={isAccepted}
                        onChange={handleChecked}
                        className="form-check-input"
                        name="isAccepted"
                        required
                      />
                      <label className="form-check-label">Accept terms and conditions</label>
                    </div>

                    <div className="mb-4 text-center">
                      <button className="btn btn-dark btn-lg" type="submit">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRegister; 




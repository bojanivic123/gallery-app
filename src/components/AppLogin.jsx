import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { login } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";  

const AppLogin = () => {
  const { logInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    login(user.email, user.password)
      .then(({ data }) => {
        logInUser(data.user);
        localStorage.setItem("access_token", data.authorisation.token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);

        setError("");
        navigate("/");
      })
      .catch(() => {
        setError("Invalid email or password. Please try again.");
      });

    setUser({
      email: "",
      password: "",
    });
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="container-fluid py-5 bg-primary" style={{ minHeight: "100vh", width: "100%" }}> 
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-xl-6">
          <div className="card p-4" style={{ borderRadius: "1rem", opacity: "90%" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body text-black">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <h1 className="fw-bold mb-4">Login</h1>
                  {error && <div className="alert alert-danger mb-4">{error}</div>}
                  <div className="mb-4">
                    <label htmlFor="floatingInput">Email</label>
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handelInputChange} value={user.email} required />
                  </div> 
                  <div className="mb-4">
                  <label htmlFor="floatingPassword">Password</label>
                    <input type="password" className="form-control" id="floatingPassword" name="password" onChange={handelInputChange} value={user.password} placeholder="Password" required />
                  </div>
                  <div className="mb-4 text-center">
                    <button className="btn btn-dark btn-lg" type="submit">Log in</button> 
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

export default AppLogin;












